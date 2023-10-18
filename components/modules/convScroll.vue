<template>
    <div class="scroll-content"  @wheel="convWheel" ref="wheelContent">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>

.scroll-content {
}
</style>

<script>
export default {
    name:'convScroll',
    props:{
        wheelAmount: Object,
        isWheel: Boolean,
    },
    mounted(){
    },
    methods: {
        convWheel(event) {
            // console.log(event.deltaY)
            const content = this.$refs.wheelContent.children[0].children[0]
            content.scrollLeft = content.scrollLeft - event.deltaY;
            
            const scrollAmount = content.scrollLeft;  // 横方向のスクロール量を取得
            this.$store.commit('common/setScrollAmount', scrollAmount);
        }
    }
}
</script>