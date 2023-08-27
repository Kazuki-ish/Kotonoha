<template>
    <div class="button-list" v-if="$route.path.includes('writeNovel') && $route.params.slug || $route.name == 'write'">
        <button class="c-black-txt" @click="draftNovel" :class="{ '-pushed': pushed, '-succeed': succeed }">
            <span class="button-list__txt" @transitionend="pushRouter">
                {{ draftButtonText }}
            </span>
        </button>
        <button class="c-black-txt" @click="overWriteNovel" :class="{ '-pushed': pushed, '-succeed': succeed }">
            <span class="button-list__txt" @transitionend="pushRouter">
                {{ publishButtonText }}
            </span>
        </button>
        <button class="c-black-txt" @click="deleteNovel" :class="{ '-pushed': pushed, '-succeed': succeed }">
            <span class="button-list__txt" @transitionend="pushRouter">
                {{ deleteButtonText }}
            </span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .button-list {
        @include absolute(50%, -62px);
        color: black;
        display: flex;
        justify-content: center;
        margin-top: calc(12 / 1686 * 100vh);
        transform: translateX(-50%);

        button {
            @include cubic_ease($time: 4s);
            @include NM_convex_anim;
            border-radius: calc(21 / 780 * 100vw);
            padding: 0.5rem .75rem;

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
        white-space: nowrap;

        .-pushed & {
            transform: rotate(360deg);
        }

        .-succeed & {
            opacity: 0;
        }
    }
</style>

<script>
export default {
    data() {
        return {
            draftButtonText: '保存する',
            publishButtonText: '公開する',
            deleteButtonText: '削除する',
            pushed: false,
            succeed: false,
        }
    },
    methods: {
        async draftNovel(event) {
            this.pushed = true;
            this.draftButtonText = '保存中';

            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            const slug = this.$store.state.novels.slug;
            // 初期化してないから上書きされる。。。
            const isPublic = false;

            if (!title || !body) {
                //console.log("Title or body is missing");
                // this.draftButtonText = '失敗';
                setTimeout(() => {
                    this.draftButtonText = '保存';
                }, 500 )
                return;
            }

            await this.$store.dispatch("novels/saveNovel", {
                uid: this.$store.state.user.uid,
                title,
                body,
                slug,
                isPublic,
            });
        },
        async overWriteNovel(event) {
            this.pushed = true;
            this.publishButtonText = '公開中';

            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            const slug = this.$store.state.novels.slug;
            const isPublic = true;

            if (!title || !body) {
                //console.log("Title or body is missing");
                this.publishButtonText = '失敗';
                setTimeout(() => {
                    this.publishButtonText = '保存';
                }, 500 )
                return;
            }

            await this.$store.dispatch("novels/saveNovel", {
                uid: this.$store.state.user.uid,
                title,
                body,
                slug,
                isPublic,
            });
            // console.log("Novel saved successfully");
        },
        async deleteNovel(event) {
            this.pushed = true;
            const slug = this.$store.state.novels.slug;
            // console.log(slug)

            await this.$store.dispatch("novels/deleteNovel", {
                uid: this.$store.state.user.uid,
                slug,
            });
        },
        pushRouter(event) {
            if (event.propertyName === 'transform' && this.pushed) {
                this.succeed = true;
                this.publishButtonText = '完了';
            } else if (event.propertyName === 'opacity' && this.succeed) {
                this.$router.push('/writeNovel');
            }
        },
        init() {
            if (this.$route.path === '/writeNovel') {
                this.pushed = false;
                this.succeed = false;
                this.publishButtonText = '公開';
                this.darftNovelText = '保存';
            }
        },
    },
    watch: {
        '$route.path': {
            handler: 'init',
            immediate: false
        },
    },

}</script>