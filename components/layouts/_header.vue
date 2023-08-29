<template>
    <header class="l-header">
        <div class="l-header__wrap c-menu-op" :class="{
                '-ready': this.$store.state.common.isOpenMenu
            }">
            <p class="l-header__txt -page-name">
                {{ this.$store.state.common.pageName }}
            </p>
            <p class="l-header__txt -auther" >
                {{ this.$store.state.common.auther }}
            </p>
        <UiLogo />
        </div>
        <UiMenuButton />
        <div class="header-bg"></div>
    </header>
</template>

<style lang="scss" scoped>
    .l-header{
        position: relative;
        width:100%;
        height:60px;
    }

    .l-header__txt {
        bottom: 6px;
        font-size: 12px;
        position: absolute;
        letter-spacing: -0.05em;
        line-height: 1;

        &.-page-name {
            left: 12px;
        }
        &.-auther {
            text-align: right;
            right: 62px;
        }
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