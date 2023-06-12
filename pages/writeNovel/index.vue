<template>
    <section class="c-vertical-inner" id="js-c-scroll">
        <ul class="booklist c-vertical">
            <div class="booklist__profile">
                <UiIcon />
                <h2 class="booklist__display-name">{{ this.$store.state.user.profile.name }}</h2>
            </div>
            <li class="booklist__item">
                <h1 class="booklist__item__title">新しく書く</h1>
                <nuxt-link :to="'/write'">
                    <p class="booklist__item__text -add-novel"><span></span><span></span></p>
                </nuxt-link>
            </li>
            <li class="booklist__item" v-for="novel in novels" :key="novel.id">
                <h1 class="booklist__item__title" v-html="novel.title"></h1>
                <nuxt-link :to="`/writeNovel/${novel.id}`">
                    <p class="booklist__item__text" v-html="novel.body"></p>
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
.booklist {

    h1 {
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
        display: block;
    }

    p {
        @include NM_convex;
        border-radius: 18px;
        //padding:16px 16px 12px;
        margin: 0;
    }
}

.booklist__profile {
    display: block;
}

.booklist__display-name {
    position: relative;
    top: 24px;
    font-size: 24px;
    font-weight: 300;
}

.booklist .booklist__item {
    @include relative;
    height: get_Vh(857);
    //width: get_Vw(373);
    white-space: pre-wrap;
    list-style: none;
    //padding:0 1.4rem;

    &:nth-of-type(n + 2) {
        margin-right: 2rem;
    }
    &:first-child {
        margin-right: 1rem;
    }
    &:last-child {
        margin-left: 4rem;
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
    margin-left: -1rem;
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

.booklist .booklist__item__text.-add-novel {
        @include NM_dent;
        position: relative;
        min-height: get_Vh(857);
        min-width: get_Vw(252);

        span:first-of-type {
            transform: rotate(90deg) translate(0, calc(get_Vw(30) / 2));
        }
        span{
            @include absCenter;
            border-top: solid black 1px;
            display: block;
            width: get_Vw(30);
        }

}
</style>
  
<script>
export default {
    data() {
        return {
            displayName: this.$store.state.user.profile.name,
            displayIcon: this.$store.state.user.icon,
        }
    },
    computed: {
        // Vuex ストアから小説データを取得
    novels() {
            return this.$store.state.novels.userNovels;
        },
        uid() {
            return this.$store.state.user.uid;
        },
        watchMode() {
            return this.$store.state.user.editNovel;
        },
    },
    async fetch() {
        this.setPageName()
        // this.setUser()
    },
    created() {
        this.$store.commit('user/setMode', this.$route.name)
        // console.log(this.$store.state.user.editNovel)
        // console.log(this.displayName)
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
        watchMode(beforeToggle, afterToggle) {
            if (afterToggle == true) {
                this.$scrollSet();
            }
        }
    },
    methods: {
        async fetchUserNovels() {
            await this.$store.dispatch('novels/fetchUserNovels', this.uid);
            await this.$scrollSet()
        },
        setPageName() {
            this.$store.commit("common/inputPageName", '作品を書く')
        },
        // async setUser() {
        //     this.$store.dispatch('user/setUserFromAuth')
        // },
    },
    async mounted() {//DOMマウント後に実行
        this.fetchUserNovels()
    },
};
</script>
  