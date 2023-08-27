<template>
    <ul class="booklist c-vertical">
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
        </li>
    </ul>
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

    .-top & {

    }
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
    height: 80%;
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
    margin-top: 20%;
}

.booklist .booklist__item__wrapper {
    display: flex;
    justify-content: flex-end;
}

.booklist .booklist__item__title {
    display: block;
    font-size: 18px;
    margin-left: -1rem;
    line-height: 1;
}

.booklist .booklist__bottom-wraper {
    text-align: right;
    margin-right: -1rem;
}
.booklist__item__link {
    display: block;
}

.booklist .booklist__item__author {
    left: 0;
    line-height: 1;
    bottom: 0;
}

.booklist .booklist__item__text {
    padding: 1rem;
    margin: 10px 0.2rem;
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
            await this.$scrollSet()
        },
        async fetchUserNovels() {
            await this.$store.dispatch('novels/fetchUserNovels');
            await this.$scrollSet();
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