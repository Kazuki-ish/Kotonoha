<template>
    <section class="c-vertical-inner" id="js-c-scroll">
        <ul class="booklist c-vertical">
            <li class="booklist__item" v-for="novel in novels" :key="novel.id">
                <h1 class="booklist__item__title" v-html="novel.title"></h1>
                <nuxt-link :to="`/${uid}/${novel.id}`">
                    <p class="booklist__item__text" v-html="novel.body"></p>
                </nuxt-link>
            </li>
        </ul>
        <ModulesScroll ref="scroll" />
    </section>
</template>

<style lang="scss" scoped>
.booklist {

    h1 {
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
    }

    p {
        @include NM_convex;
        border-radius: 18px;
        //padding:16px 16px 12px;
        margin: 0;
    }
}

.booklist .booklist__item {
    @include relative;
    height: get_Vh(857);
    //width: get_Vw(373);
    white-space: pre-wrap;
    list-style: none;
    //padding:0 1.4rem;

    &:nth-child(n + 2) {
        margin-right: 0.4rem;
    }
}

.booklist .booklist__item:nth-child(even) {
    margin-top: get_Vh(301);
}

.booklist .booklist__item__wrapper {
    display: flex;
    justify-content: flex-end;
}

.booklist .booklist__item__title {
    line-height: 1;
}

.booklist .booklist__item__author {
    left: 0;
    line-height: 1;
    bottom: 0;
}

.booklist .booklist__item__text {
    padding: 1rem;
    margin: 0 0.2rem;
}
</style>
  
<script>
export default {
    computed: {
        // Vuex ストアから小説データを取得
        novels() {
            return this.$store.state.novels.userNovels;
        },
        uid() {
            return this.$store.state.user.uid;
        },
    },
    async fetch() {
        this.fetchNovels()
    },
    created() {
        this.$store.commit('user/setMode', this.$route.name)
        // console.log(this.$store.state.user.editNovel)
    },
    watch: {
        uid(newUid, oldUid) {
            if (newUid) {
                // uidが存在し、新しいuidと古いuidが異なる場合にfetchUserNovelsを実行
                if (!oldUid || newUid !== oldUid) {
                    this.fetchUserNovels();
                }
            }
        },
    },
    methods: {
        async fetchUserNovels() {
            await this.$store.dispatch('novels/fetchUserNovels', this.uid);
        },
        fetchNovels() {
            this.$store.commit("common/inputPageName", '書いた小説')
            // this.$store.commit("user/setMode", 'novelList')
        }
    },
    mounted() {//DOMマウント後に実行

        //右端までスクロールする
        this.$refs.scroll.scrollSet()
    },
    watch: {
        novelMode(beforeToggle, afterToggle) {
            if (afterToggle == true) {
                this.$refs.scroll.scrollSet()
            }
        }
    },
};
</script>
  