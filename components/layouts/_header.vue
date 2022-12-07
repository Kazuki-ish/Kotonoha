<template>
    <header class="l-header">
        <UiLogo />
        <UiMenubutton />
        <div class="header-bg"></div>
    </header>
</template>

<style lang="scss" scoped>
    .l-header{
        position: relative;
        width:100%;
        height:60px;
    }
    .header-bg{
        @include NM_convex;
        border-radius:9999px 0 0 9999px;
        width:100%;
        height: 100%;
    }
</style>

<script>
export default {
        name:'Header'
    }
</script>