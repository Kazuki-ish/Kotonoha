<template>
    <div class="bookmark" :class="{ '-bookmarked': $store.state.novels.isBookmark == true }">
        <button class="bookmark__btn" @click="bmHandler">
            <transition-group name="fade" tag="div" class="bookmark-container">
                <img class="bookmark__ico" src="~/assets/imgs/ico/bookmarked.png" v-if="$store.state.novels.currentBookmark" key="bookmarked">
                <img class="bookmark__ico" src="~/assets/imgs/ico/bookmark.png" v-else key="bookmark">
            </transition-group>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .bookmark {
        @include cubic_ease(box-shadow, $time: .2s);
        @include NM_convex_anim;
        position: relative;
        border-radius: calc(21 / 780 * 100vw);

        button {
            padding: 0.5rem +  .75rem;

            &:nth-child(n + 2) {
                margin-left: calc(94 / 780 * 100vw);
            }
        }

        &__ico {
            @include absCenter;
            height: 1.5rem;
        }
    }

    .bookmark-container {
        display: grid;
    }
    .fade-enter-active, .fade-leave-active {
        @include cubic_ease(opacity);
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
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
                this.$router.push('/signin');
            }
            else {
                await this.$store.dispatch("novels/addBookmarks", {novel_uid:uid, slug})
                // console.log(this.$store.state.novels.readingNovel)
                //console.log(this.$store.state.novels.bookmarks)
                this.$store.commit('novels/setCurrentBookmark', true)

                // 一定時間後にボタンを再びクリック可能にする
                setTimeout(() => {
                    this.isBtnClickable = true;
                }, 1000); // 1秒のクールタイム
            }
        }
    },
}
</script>