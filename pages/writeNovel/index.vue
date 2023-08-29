<template>
    <section class="c-vertical-inner">
        <ul class="booklist c-vertical" id="js-c-scroll">
            <div class="booklist__profile">
                <UiIcon />
                <h2 class="booklist__display-name">{{ this.$store.state.user.profile.name }}</h2>
            </div>
            <li class="booklist__item">
                <h1 class="booklist__item__title">新しく書く</h1>
                <nuxt-link :to="'/write'" @click="pushed">
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
.booklist .booklist__item__text.-add-novel {
    @include NM_dent_anim;
    @include cubic_ease($time: .2s);
    position: relative;
    min-height: get_Vh(857);
    min-width: get_Vw(252);

    @media screen and (min-width: 768px) {
        min-height: 400px;
        min-width: 120px;
    }

    &.-pushed {
        @include NM_normal_anim;
    }

    span:first-of-type {
        transform: rotate(90deg) translate(0, calc(get_Vw(30) / 2));

        @media screen and (min-width: 768px) {
            transform: rotate(90deg) translate(0, calc(1.5rem / 2));
        }
    }

    span {
        @include absCenter;
        border-top: solid black 1px;
        display: block;
        width: get_Vw(30);

        @media screen and (min-width: 768px) {
            width: 1.5rem;
        }
    }

}
</style>
  
<script>
export default {
    data() {
        return {
            displayName: this.$store.state.user.profile.name,
            displayIcon: this.$store.state.user.icon,
            newPushed: false,
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
        // this.$store.commit('user/setMode', this.$route.name)
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
        pushed() {
            this.newPushed = true;
        }
        // async setUser() {
        //     this.$store.dispatch('user/setUserFromAuth')
        // },
    },
    async mounted() {//DOMマウント後に実行
        this.fetchUserNovels()
    },
    beforeDestroy() {
        this.$store.dispatch('common/changeIsMounted', false); 
    },
};
</script>
  