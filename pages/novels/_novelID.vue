<template>
    <div>
        <h1>{{ novel.title }}</h1>
        <div v-html="sanitizedBody"></div>
    </div>
</template>
  
<script>
export default {
    async asyncData({ params, store }) {
        // ルーティングのパラメータから novelId を取得
        const novelId = params.novelId;

        // ストアのアクションを使って、小説のデータを取得
        await store.dispatch('novels/fetchNovel', novelId);

        // 取得した小説データをコンポーネントのデータに設定
        return {
            novel: store.state.novels.currentNovel,
        };
    },
    computed: {
        sanitizedBody() {
            return this.$sanitize(this.novel.body);
        },
    },
};
</script>
  