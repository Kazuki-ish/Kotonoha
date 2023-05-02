<template>
    <section class="login-button">
        <div class="login-button__name" v-if="this.$store.state.user.isLogin">
            <p class="login-button__name__user" v-if="!this.$store.state.user.profile.name">
                <nuxt-link :to="this.profile">
                表示名未設定
                </nuxt-link>
            </p>
            <p class="login-button__name__user">
                <nuxt-link :to="this.profile">
                {{ this.$store.state.user.profile.name }}
                </nuxt-link>
            </p>
        </div>
        <div class="login-button__topage" v-else>
            <nuxt-link :to="this.signUp">
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
            signUp: '/signup/',
            profile: '/profile/'
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