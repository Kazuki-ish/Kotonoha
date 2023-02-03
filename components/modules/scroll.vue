<template></template>

<style lang="scss">
    #js-c-scroll{
        @include cubic_ease;
        // visibility: hidden;
        opacity:0;//アニメーション初期化
        
        &.-mounted{
            opacity: 1;
        }
    }
</style>

<script>
export default {
    name:'ScrolleModule',
    mounted(){
    },
    methods: {
        scrollSet () {
            const content = document.getElementById('js-c-scroll');
            const scrollWidth = content.scrollWidth;
            console.log(scrollWidth);

            content.scrollLeft = scrollWidth;
            content.classList.add('-mounted');
        }
    }
}
</script>