<template>
    <div class="bookmark" :class="{ '-bookmarked': $store.state.novels.isBookmark == true }">
        <button class="bookmark__btn" @click="bmHandler">
            <img class="bookmark__ico" src="~/assets/imgs/ico/bookmark.png" v-if="$store.state.novels.isFavorite == true">
            <img class="bookmark__ico" src="~/assets/imgs/ico/bookmark.png" v-if="$store.state.novels.isFavorite == false">
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .bookmark {
        @include cubic_ease(box-shadow, $time: .2s);
        @include NM_convex_anim;
        border-radius: calc(21 / 780 * 100vw);

        button {
            padding: 0.5rem .75rem;

            &:nth-child(n + 2) {
                margin-left: calc(94 / 780 * 100vw);
            }
        }

        &__ico {
            display: block;
            height: 1.5rem;
        }
    }
</style>

<script>
export default {
    async fetch() {
    },
    data() {
        return {
            isBtnClickable: true,
            bookmarks: [],
        }
    },
    methods: {
        async bmHandler() {
        const { uid, slug } = this.$route.params;  
            this.isBtnClickable = false;

            if (!this.$store.state.user.isLogin) {
                this.$router.push('/signup');
            }
            else {
                await this.$store.dispatch("novels/addBookmarks", {novel_uid:uid, slug})
                // console.log(this.$store.state.novels.readingNovel)

                // 一定時間後にボタンを再びクリック可能にする
                setTimeout(() => {
                    this.isBtnClickable = true;
                }, 1000); // 1秒のクールタイム
            }
        }
    },
}
</script>