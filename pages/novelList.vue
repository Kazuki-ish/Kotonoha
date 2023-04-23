<template>
    <div>
        <ul>
            <li v-for="novel in novels" :key="novel.id">
                <nuxt-link :to="`/novels/${novel.id}`">
                    <div v-html="novel.title"></div>
                    <div v-html="novel.body"></div>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
  
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
    created() {
    this.$store.commit("common/inputPageName", '書いた小説')
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
    },
};
</script>
  