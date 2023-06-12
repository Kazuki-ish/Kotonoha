<template>
    <footer :class="{
        '-write': $route.name == 'write',
        '-novel-list': $route.name == 'myNovels',
        '-profile': $route.name == 'profile'
    }">
        <!-- <div class="button-list" v-if="$route.name == 'write'">
            <button class="c-black-txt" @click="saveNovel">保存する</button>
        </div> -->
        <div class="button-list" v-if="$route.path.includes('writeNovel') && $route.params.slug || $route.name == 'write' ">
            <button class="c-black-txt" @click="overWriteNovel" :class="{ '-pushed': pushed, '-succeed': succeed }">
                <span class="button-list__txt" @transitionend="pushRouter">
                    {{ buttonText }}
                </span>
            </button>
        </div>
        <UiToggleMode />
    </footer>
</template>

<style lang="scss" scoped>
footer {
    bottom: 0;
    min-height: calc(120 / 1686 * 100vh);
    position: absolute;
    pointer-events: auto;
    width: 100%;

    &.-write {
        pointer-events: visible;
    }

    &.-profile {
        pointer-events: visible;
    }
}

.button-list {
    @include absolute(50%, -62px);
    color: black;
    display: flex;
    justify-content: center;
    margin-top: calc(12 / 1686 * 100vh);
    transform: translateX(-50%);

    button {
        @include cubic_ease();
        @include NM_convex_anim;
        border-radius: calc(21 / 780 * 100vw);
        padding: 8px;

        &:nth-child(n + 2) {
            margin-left: calc(94 / 780 * 100vw);
        }

        &.-pushed {
            @include NM_dent_anim;
        }
        &.-succeed {
            opacity: 0;
        }
    }
}

.button-list__txt {
    @include cubic_ease();
    display: inline-block;

    .-pushed & {
        transform: rotate(360deg);
    }
    .-succeed &{
            opacity: 0;
    }
}
</style>

<script>
import { getRedirectResult } from '@firebase/auth';

export default {
    name: 'Footer',

    data() {
        return {
            buttonText: '保存する',
            pushed: false,
            succeed: false,
        }
    },
    computed: {
    },
    methods: {
        async saveNovel() {
            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            // console.log(this.$store.state.novels.title)

            if (!title || !body) {
                console.log("Title or body is missing");
                return;
            }

            await this.$store.dispatch("novels/addNovel", {
                uid: this.$store.state.user.uid,
                title,
                body
            });

            console.log("Novel saved successfully");
        },
        async overWriteNovel(event) {
            this.pushed = true;
            this.buttonText = '保存中';

            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            const slug = this.$store.state.novels.slug;

            if (!title || !body) {
                //console.log("Title or body is missing");
                this.buttonText = '失敗';
                return;
            }

            await this.$store.dispatch("novels/saveNovel", {
                uid: this.$store.state.user.uid,
                title,
                body,
                slug,
            });
            // console.log("Novel saved successfully");
        },
        pushRouter(event) {
            if (event.propertyName === 'transform' && this.pushed) {
                this.succeed = true;
                this.buttonText = '完了';
            } else if (event.propertyName === 'opacity' && this.succeed) {
                this.$router.push('/writeNovel');
            }
        },
        init() {
            if (this.$route.path === '/writeNovel') {
                this.pushed = false;
                this.succeed = false;
                this.buttonText = '保存する';
            }
        },
    },
    watch: {
        '$route.path': {
            handler: 'init',
            immediate: false
        },
    },
}
</script>