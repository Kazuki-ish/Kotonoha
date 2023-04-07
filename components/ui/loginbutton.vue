<template>
    <section class="login-button">
        <div class="login-button__name" v-if="this.$store.state.user.isLogin">
            <p class="login-button__name__user">
                {{ this.$store.state.user.profile.name }}
            </p>
        </div>
        <div class="login-button__topage" v-else>
            <nuxt-link :to="this.link">
                ログイン/新規登録
            </nuxt-link>
        </div>
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

    .login-button__name__user {
        font-size: 1rem;
    }
</style>
<script>
export default {
    data() {
        return {
            link: '/signup/'
        };
    },
    created() {
        // this.$store.dispatch('user/listenAuthStateChanged')
    },
    mounted() {
        // console.log( this.$store.state.user );
    },
}

</script>