<template>
    <section class="sign-up">
        <div class="sign-up__inner">
            <div class="sign-up__mail">
                <p class="sign-up__mail__txt">メールアドレス(新規登録)</p>
                <input class="sign-up__mail__input" v-model="email" type="email" placeholder="メールアドレス" />
                <p class="sign-up__mail__txt">パスワード(6文字以上)</p>
                <input class="sign-up__mail__input" v-model="password" type="password" placeholder="パスワード" />
                <button class="sign-up__mail__btn -sign-up" @click="signUp(email, password)">メールアドレスで登録する</button>
            </div>
            <div class="sign-up__btn -google">
                <button @click="signInWithGoogle" class="sign-up__google__btn">
                    Googleで登録する
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sign-up {
    margin: 0.5rem;

    button {
        @include NM_convex;
        color: #121212;
        display: block;
        border-radius: 0.75rem;
        padding: 0.5rem 1rem;
        margin: 1.5rem auto 0;
        min-width: 11rem;
    }

    input {
        @include NM_dent;
        display: block;
        background-color: $base-color;
        color: #121212;
        border-radius: 0.75rem;
        padding: 0.5rem 0;
        text-align: center;
        margin: 0.725rem auto 0;
        min-width: 13rem;
    }
}

.sign-up__inner {
    justify-content: center;
    text-align: center;
}

.sign-up__mail {}

.sign-up__mail__txt {
    &:nth-child(n + 2) {
        margin-top: 1.5rem;
    }
}

.sign-up__mail__btn {
    margin-top: 2rem;

    &.-login {
        margin-top: 4rem;
    }
}

.sign-up__btn {
    margin: 1.5rem auto 0;

    &.-google {
        // margin-top: 4rem;
    }
    & button {
        color: #121212;
        min-width: 230px;
    }
}
</style>
 
<script>

export default {
    data() {
        return {
            pageName: 'コトノハに新規登録する',
            email: '',
            password: '',
        };
    },
    created() {
        this.$store.commit("common/inputPageName", this.pageName)
        if (this.$store.state.user.isLogin) {
            this.$router.push('/profile');
        }
    },
    mounted() {
        this.$store.dispatch('common/changeIsMounted', true); 
    },
    methods: {
        async signInWithGoogle() {
            const success = await this.$store.dispatch('user/signUpWithGoogle',)
            if (success) {
                this.$router.push('/');
            } else {
                // エラー処理などをここで行うことができます。
            }
        },
        async signUp(email, password) {
            this.$store.dispatch('user/signUpWithEmail', { email, password })
            this.$router.push('/');
        },
    },
    beforeDestroy() {
        this.$store.commit('common/setIsMounted', false)
    },
}

</script>