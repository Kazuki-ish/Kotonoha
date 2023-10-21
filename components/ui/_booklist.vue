<template>
    <ul class="booklist c-vertical" ref="scrollContent">
        <div class="booklist__profile" v-if="isProfile">
            <UiIcon />
            <h2 class="booklist__display-name">{{ this.$store.state.user.profile.name }}</h2>
        </div>
        <li class="booklist__item" v-for="(novel, index) in novels" :key="novel.id">
            <h1 class="booklist__item__title" v-html="novel.title"></h1>
            <nuxt-link :to="`/${uid(index)}/${novel.id}`" clsss="booklist__item__link">
                <p class="booklist__item__text" v-html="novel.body"></p>
            </nuxt-link>
            <div v-if="novel.name && $route.name !== 'myNovels'" class="booklist__bottom-wraper">
                <h2 class="booklist__item__auther">{{ novel.name }}</h2>
            </div>
            <div v-if="$route.name !== 'myNovels'" class="booklist__item__fav">
                <img src="~/assets/imgs/ico/favorite.png" alt="" class="booklist__item__fav-ico">
                <p class="booklist__item__fav-num" v-if="novel.favNumber"> {{ novel.favNumber }}</p>
            </div>
        </li>
    </ul>
</template>

<style lang="scss">

// このコンポーネントのみ全体にcssが適用されるので、命名規則や影響範囲に注意

.booklist {

    h1 {
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
        display: block;
    }

    .booklist__item__text {
        @include NM_convex;
        border-radius: 1rem;
        //padding:16px 16px 12px;
        margin: 0;
        @media screen and (min-width: 768px) {
            border-radius: 0.75rem;
        }
    }

    .-top & {}
}

.booklist__profile {
    display: block;
}

.booklist__item__auther {
    font-size: 20px;
    font-weight: 300;
}

.booklist .booklist__item {
    @include relative;
    height: 85%;
    //width: get_Vw(373);
    white-space: pre-wrap;
    list-style: none;

    //padding:0 1.4rem;

    &:nth-of-type(n + 2) {
        margin-right: 3rem;

        @media screen and (min-width: 768px) {
            margin-right:5rem;
        }
    }

    &:first-child {
        margin-right: 1rem;
    }

    &:last-child {
        margin-left: 4rem;
    }
}

.booklist .booklist__item:nth-child(even) {
    margin-top: 15%;
}

.booklist .booklist__item__wrapper {
    display: flex;
    justify-content: flex-end;
}

.booklist .booklist__item__title {
    display: block;
    font-size: 18px;
    margin-left: -1rem;
    margin-top: .5rem;
    line-height: 1;
}

.booklist .booklist__bottom-wraper {
    text-align: right;
    margin-right: -1rem;
    margin-bottom: .5rem;
}

.booklist__item__link {
    display: block;
}

.booklist .booklist__item__author {
    left: 0;
    line-height: 1;
    bottom: 1rem;
}

.booklist .booklist__item__text {
    padding: 1rem .75rem;
    margin: .5rem 0.2rem;
}

.booklist__item__fav {
    @include absolute($bottom:.5rem, $right:0);
    width: 1rem;
    display: flex;
    justify-content: center;
    text-align: center;
}

.booklist .booklist__item .booklist__item__fav-num {
    text-combine-upright: all;
    line-height: 1;
    text-indent: 0;
    margin-top: .25rem;
}

.booklist__item__fav-ico {
    height: .794rem;
    width:1rem
}
</style>

<script>
export default {
    //動的コンポーネント化している。mynovelsとtopで共通のコンポーネント
    name: 'BookList',
    props: {
        isProfile: {
            type: Boolean,
        },
    },
    async fetch() {
        if (this.$route.name == "myNovels") { //ルートネームにmynovelsがあったら現在ログインしているユーザーのノベルスをデータに入れる
            this.fetchUserNovels()
        }
        else {
            this.fetchNewNovels()
        }
    },
    computed: {
        novels() {
            if (this.$route.name == "myNovels") {
                return this.$store.state.novels.userNovels;
            }
            else {
                return this.$store.state.novels.newNovels;
            }
        },
    },
    created() {
        // this.$store.commit("common/inputPageName", 'ホーム')
    },
    mounted() {
        // console.log(this.$store.state.user.profile.name)
    },
    updated() {
        // console.log(this.$store.state.novels.newNovels)
    },
    methods: {
        async fetchNewNovels() {
            await this.$store.dispatch('novels/fetchNewNovels');
            await this.$scrollSet(this.$refs.scrollContent)
        },
        async fetchUserNovels() {
            await this.$store.dispatch('novels/fetchUserNovels');
            await this.$scrollSet(this.$refs.scrollContent);
        },
        uid(index) {
            if (this.$route.name == "myNovels") {
                return this.$store.state.user.uid;
            }
            else {
                return this.$store.state.novels.newNovels[index].uid;
            }
        },
    },
}
</script>