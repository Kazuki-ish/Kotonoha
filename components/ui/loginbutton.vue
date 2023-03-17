<template>
    <section class="login-button">
        <nuxt-link :to="this.link">
            ログインする
        </nuxt-link>
    </section>
</template>

<style lang="scss" scped>
    .login-button {
        @include NM_convex;
        border-radius: 9999px;
        padding: 10px 20px;
        position: absolute;
        top: 10px;
        left: 12px;
        line-height: 1;
        z-index: 10;
    }
</style>
<script>
export default {
    data() {
        return {
            link: '/login/'
        }
    }
}

</script>