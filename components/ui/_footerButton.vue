<template>
    <!-- あとボタンだけいじったらリリース -->
    <div class="button-list" v-if="$route.path.includes('writeNovel') && $route.params.slug || $route.name == 'write'">
        <button class="c-black-txt" @click="draftNovel" :class="{ '-pushed': pushed.draft }">
            <span class="button-list__txt">
                {{ draftButtonText }}
            </span>
        </button>
        <button class="c-black-txt" @click="overWriteNovel" :class="{ '-pushed': pushed.publish }">
            <span class="button-list__txt">
                {{ publishButtonText }}
            </span>
        </button>
        <button class="c-black-txt" @click="deleteNovel" :class="{ '-pushed': pushed.delete }">
            <span class="button-list__txt">
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
            @include cubic_ease(box-shadow, $time: .2s);
            @include NM_convex_anim;
            border-radius: calc(21 / 780 * 100vw);
            padding: 0.5rem .75rem;

            &:nth-child(n + 2) {
                margin-left: calc(94 / 780 * 100vw);
            }

            &.-pushed {
                @include NM_dent_anim();
            }
        }
    }

    .button-list__txt {
        @include cubic_ease();
        display: inline-block;
        white-space: nowrap;
    }
</style>

<script>
export default {
    data() {
        return {
            pushed: {
                draft: false,
                publish: false,
                delete: false,
            },
            draftButtonText: '保存する',
            publishButtonText: '公開する',
            deleteButtonText: '削除する',
        }
    },
    computed: {
        // draftButtonText() {
            // if(){

            // }
            // else {

            // }
        // },
    },
    methods: {
        async draftNovel(event) {
            this.pushed.draft = true;

            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            const slug = this.$store.state.novels.slug;
            // 初期化してないから上書きされる。。。
            const isPublic = false;

            if (!title && !body) {
                this.$store.dispatch('common/setMessage', '保存できませんでした')
                return;
            }

            await this.$store.dispatch("novels/saveNovel", {
                uid: this.$store.state.user.uid,
                title,
                body,
                slug,
                isPublic,
            });
            this.$store.dispatch('common/setMessage', '下書きを保存しました')
            this.init()
        },
        async overWriteNovel(event) {
            this.pushed.publish = true;

            const title = this.$store.state.novels.title;
            const body = this.$store.state.novels.body;
            const slug = this.$store.state.novels.slug;
            const isPublic = true;

            if (!title || !body) {
                //console.log("Title or body is missing");
                this.$store.dispatch('common/setMessage', '公開できませんでした')
                return;
            }

            await this.$store.dispatch("novels/saveNovel", {
                uid: this.$store.state.user.uid,
                title,
                body,
                slug,
                isPublic,
            });
            this.$store.dispatch('common/setMessage', '作品を公開しました')
            this.init()
            // console.log("Novel saved successfully");
        },
        async deleteNovel(event) {
            this.pushed.delete = true;
            const slug = this.$store.state.novels.slug;
            // console.log(slug)

            await this.$store.dispatch("novels/deleteNovel", {
                uid: this.$store.state.user.uid,
                slug,
            });
            this.$store.dispatch('common/setMessage', '作品を削除しました')
            this.init()
        },
        init() {
                this.pushed.draft = false;
                this.pushed.publish = false;
                this.pushed.delete = false;
                this.$router.push('/writeNovel');
        },
    },
    watch: {
        // '$route.path': {
        //     handler: 'init',
        //     immediate: false
        // },
    },
    beforeDestroy() {
        this.$store.dispatch('common/changeIsMounted', false); 
    }

}</script>