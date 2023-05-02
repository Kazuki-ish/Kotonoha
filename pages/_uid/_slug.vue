<template>
    <section class="novel c-vertical-inner" id="js-c-scroll" ref="scrollContent">
        <div class="c-vertical" v-if="novel">
            <h1 class="novel__title" v-html="novel.title"></h1>
            <p class="novel__body" v-html="novel.body"></p>
        </div>
        <!-- <div class="c-vertical" v-else>
            <p>小説が見つかりませんでした。</p>
        </div> -->
        <!-- <ModulesScroll ref="scroll" /> -->
    </section>
</template>

<style lang="scss" scoped>
.novel__title {
    display: block;
    margin: 0 4rem;
}

.novel__body {
    margin-right: 24px;
}
</style>
<script>

export default {
    data() {
        return {
            novel: null,
        };
    },
    async fetch() {
        const { uid, slug } = this.$route.params;
        this.novel = await this.$store.dispatch('novels/fetchSingleNovel', { uid, slug });
    },
    mounted() {//DOMマウント後に実行

    },
    updated() {
        this.$scrollSet(this.$refs.scrollContent)
    },
};
</script>