<template>
    <main class="l-main" ref="main">
        <LayoutsHeader />
        <Nuxt />
        <LayoutsFooter />
    </main>
</template>

<script>
export default {
    mounted() {
        this.$refs.main.classList.add('-mounted');
    },
    destroyed() {
        this.$refs.main.classList.remove('-mounted');
    }
 }
</script>

<style lang="scss">
    .l-main {
        @include cubic_ease;
        max-height: 100svh;
        overflow: hidden;
        max-width: 100svw;
        opacity: 0;
        
        &.-mounted {
            opacity: 1;
        }
    }

    a {
        color:black;
        text-decoration: none;
    }

    #js-c-scroll{
    @include cubic_ease;
    // visibility: hidden;
    opacity:0;//アニメーション初期化
    
        &.-mounted{
            opacity: 1;
        }
    }

    //style conponents 
    .c-black-txt {
        color:black;
    }
</style>