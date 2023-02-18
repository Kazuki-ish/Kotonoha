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

<style lang="scss" scoped>
    
    
    .l-main {
        @include cubic_ease;
        height: 100svh;
        overflow: hidden;
        width: 100svw;
        opacity: 0;
        
        &.-mounted {
            opacity: 1;
        }
    }
</style>