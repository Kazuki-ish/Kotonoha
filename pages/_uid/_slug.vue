<template>
    <ModulesConvScroll>
        <section class="novel c-vertical-inner">
            <div class="c-vertical" @scroll='setScrollAmount' v-if="novel && novel.isPublic" id="js-c-scroll"
                ref="scrollContent">
                <h1 class="novel__title" v-html="novel.title"></h1>
                <p class="novel__body" v-html="novel.body"></p>
                <!-- <UiSlugBookmarks /> -->
            </div>
            <!-- <div class="c-vertical" v-else>
                    <p>小説が見つかりませんでした。</p>
                </div> -->
        </section>
    </ModulesConvScroll>
</template>

<style lang="scss" scoped>

.novel {
    // position: relative;
}
.novel__title {
    display: block;
    margin: 0 4rem;
    max-height: 100%;
}

.novel__body {
    margin-right: 24px;
    max-height: 100%;
}
.novel__bookmarks {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
<script>

export default {
    head() {
        return {
            title: "「" + this.title + "」 " + this.auther,
        };
    },
    data() {
        return {
            novel: null,
            title: '',
            auther: '',
        };
    },
    async fetch() {
        const { uid, slug } = this.$route.params;
        this.novel = await this.$store.dispatch('novels/fetchSingleNovel', { uid, slug });
        this.title = this.novel.title;
        this.auther = this.novel.name;
        this.novel.uid = uid;
        this.$store.commit('novels/setReadingNovel', this.novel);
        await this.$store.dispatch("novels/fetchIsFavorited", { uid, slug })
        if (this.$store.state.novels.beAbleBookmark) {
            this.$store.commit('novels/clearBookmarks')
            await this.$store.dispatch("novels/fetchIsBookmarked", { novel_uid: uid, slug })
        }
    },
    async mounted() {//DOMマウント後に実行
    },
    created() {
        this.$store.commit('user/setMode', this.$route.name)
        this.$store.commit('common/setIsNovelPage', true);
        // console.log (this.$route)
    },
    updated() {
        if (this.novel.isPublic) {
            this.$scrollSet(this.$refs.scrollContent)
            const el = this.$refs.scrollContent;
            if (el.scrollWidth > el.clientWidth) {
                this.$store.commit("novels/setBeAbleBookmark", true)
            }
            else {
                this.$store.commit("novels/setBeAbleBookmark", false)
            }
        }
        this.$store.commit("common/inputPageName", this.novel.title)
        this.$store.commit("common/inputAuther", this.novel.name)
        // console.log(this.novel.name)
        // console.log(this.novel)
    },
    computed: {
        watchReading() {
            return this.$store.state.common.scrollAmount
        }
    },
    methods: {
        setScrollAmount(event) {
            const scrollAmount = event.target.scrollLeft;  // 横方向のスクロール量を取得
            this.$store.commit('common/setScrollAmount', scrollAmount);
            // console.log(scrollAmount);
        },
    },
    destroyed() {
        // 作家名リセット
        this.$store.commit("common/inputAuther", "")

        this.$store.commit('common/setIsReading', false)
        this.$store.commit('common/setIsNovelPage', false)
    },
    watch: {
        watchReading(after, before) {
            if (after < before) {
                // console.log('set')
                this.$store.commit('common/setIsReading', true)
            }
            else {
                this.$store.commit('common/setIsReading', false)
            }
        }
    }
};
</script>