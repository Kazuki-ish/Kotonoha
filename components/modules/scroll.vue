<template></template>

<style lang="scss">
</style>

<script>
export default {
    name:'ScrolleModule',
    mounted(){
    },
    methods: {
        scrollSet (refs) {
            
            const content = refs ? refs : document.getElementById("js-c-scroll");
            const scrollWidth = content.scrollWidth;
            // console.log(scrollWidth);

            content.scrollLeft = scrollWidth;
            // content.classList.add('-mounted');
        }
    }
}
</script>