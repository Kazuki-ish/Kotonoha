<template></template>

<style lang="scss">
</style>

<script>
export default {
    name:'convScroll',
    props:{
        element: Object
    },
    mounted(){
    },
    methods: {
        convWheel(event) {
            // console.log(event.deltaY)
            this.$refs.scrollContent.scrollLeft = this.$refs.scrollContent.scrollLeft + event.deltaY;
            
            const scrollAmount = this.$refs.scrollContent.scrollLeft;  // 横方向のスクロール量を取得
            this.$store.commit('common/setScrollAmount', scrollAmount);
        }
    }
}
</script>