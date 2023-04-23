<template>
    <footer :class="{
        '-write': $route.name == 'write',
        '-novel-list': $route.name == 'novelList',
        '-profile': $route.name == 'profile'
    }">
        <div class="button-list" v-if="$route.name == 'write'">
            <button @click="saveNovel">保存する</button>
        </div>
        <div class="mode" v-if="$route.name == 'profile'">
            <p class="mode__txt -view" :class="{ '-active': !this.$store.state.user.editProfile }">表示</p>
            <button class="mode__btn" :class="{ '-off': !this.$store.state.user.editProfile }" @click="changeMode">
                <div class="mode__btn__cir"></div>
            </button>
            <p class="mode__txt -edit" :class="{ '-active': this.$store.state.user.editProfile }">編集</p>
        </div>
        
        <div class="mode" v-if="$route.name == 'write' || $route.name == 'novelList'">
            <p class="mode__txt -view" :class="{ '-active': !this.$store.state.user.editNovel }">表示</p>
            <button class="mode__btn" :class="{ '-off': !this.$store.state.user.editNovel }" @click="changeNovelMode">
                <div class="mode__btn__cir"></div>
            </button>
            <p class="mode__txt -edit" :class="{ '-active': this.$store.state.user.editProfile }">編集</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
// toggleボタンは共通化して引数で指定できるようにする
$btn: 32px;

footer {
    bottom: 0;
    height: calc(120 / 1686 * 100vh);
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
    display: flex;
    justify-content: center;
    margin-top: calc(12 / 1686 * 100vh);

    button {
        @include NM_convex;
        border-radius: calc(21 / 780 * 100vw);
        padding: 8px;

        &:nth-child(n + 2) {
            margin-left: calc(94 / 780 * 100vw);
        }
    }
}

.mode {
    display: flex;
    position: relative;
    margin: 0 24px;
}

.mode__txt {
    @include cubic_ease;
    text-align: center;
    opacity: .2;
    width: 50%;

    &.-view {
        padding-right: $btn;
    }

    &.-edit {
        padding-left: $btn;
    }

    &.-active {
        opacity: 1;
    }
}

.mode__btn {
    @include cubic_ease;
    @include NM_dent_op;
    background-color: #A3C612;
    border-radius: 9999px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc($btn * 2);

    &.-off {
        background-color: transparent;
    }
}

.mode__btn__cir {
    @include cubic_ease;
    @include NM_convex_op;
    background-color: $base-color;
    border-radius: 9999px;
    transform: translateX(100%);
    width: $btn;
    height: $btn;

    .-off & {
        transform: translate(0);
    }
}
</style>

<script>
import { getRedirectResult } from '@firebase/auth';

export default {
    name: 'Footer',
    computed: {
        profileMode() {
            return this.$store.state.user.editProfile;
        },
        novelMode() {
            return this.$store.state.user.editNovel;
        },
        returnRoute(name) {
            $route.name == name;
        }
    },
    methods: {
        emitText() {
            this.$emit('saveText')
        },
        changeMode() {
            this.$store.commit('user/toggleMode')
            // console.log(this.$store.state.user.editProfile)
        },
        changeNovelMode() {
            this.$store.commit('user/toggleNovelMode')
            // console.log(this.$store.state.user.editProfile)
        },
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
        }
    },
    watch: {
        novelMode(beforeToggle, afterToggle) {
            if (afterToggle == true) {
                this.$router.push('/novellist');
            }
            else {
                this.$router.push('/write');
            }
        }
    },
}
</script>