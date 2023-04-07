<template>
    <header class="l-header">
        <p class="l-header__pagename">
            {{ this.$store.state.common.pageName }}
        </p>
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
    .l-header__pagename {
        bottom: 0;
        font-size: 12px;
        position: absolute;
        left: 12px;
        letter-spacing: -0.05em;
    }
    .header-bg{
        // @include NM_convex;
        border-radius:9999px 0 0 9999px;
        width:100%;
        height: 100%;
    }
</style>

<script>
export default {
        name:'Header',
    }
</script>