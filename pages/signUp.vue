<template>
    <section class="sign-up">
        <div class="sign-up__inner">
            <div class="sign-up__mail">
                <p class="sign-up__mail__txt">メールアドレス</p>
                <input class="sign-up__mail__input" v-model="email" type="email" placeholder="メールアドレス" />
                <p class="sign-up__mail__txt">パスワード</p>
                <input class="sign-up__mail__input" v-model="password" type="password" placeholder="パスワード" />
                <button class="sign-up__mail__btn -login" @click="signIn(email, password)">ログインする</button>
                <button class="sign-up__mail__btn -sign-up" @click="signUp(email, password)">新しく登録する</button>
            </div>
            <div class="sign-up__google">
                <button @click="signInWithGoogle" class="sign-up__google__btn">
                    Googleでログインする
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sign-up {
    margin: 8px;

    button {
        @include NM_convex;
        display: block;
        border-radius: 21px;
        padding: 8px 32px;
        margin: 24px auto 0;
    }

    input {
        @include NM_dent;
        display: block;
        background-color: $base-color;
        color: #121212;
        border-radius: 16px;
        padding: 8px 0;
        text-align: center;
        margin: 16px auto 0;
        min-width: calc(338px / 2);
    }
}

.sign-up__inner {
    justify-content: center;
    text-align: center;
}

.sign-up__mail {}

.sign-up__mail__txt {
    &:nth-child(n + 2) {
        margin-top: 24px;
    }
}

.sign-up__mail__btn {
    margin-top: 24px;
}

.sign-up__google {
    margin: 64px auto 0;
}
</style>
 
<script>

export default {
    data() {
        return {
            pageName: '新規登録/ログインする',
            email: '',
            password: '',
        };
    },
    created() {
        this.$store.commit("common/inputPageName", '新規登録/ログインする')
        if (this.$store.state.user.isLogin) {
            this.$router.push('/profile');
        }
    },
    methods: {
        async signIn(email, password) {
            const success = await this.$store.dispatch('user/signIn', { email, password });
            if (success) {
                this.$router.push('/');
            } else {
                // エラー処理などをここで行うことができます。
            }
        },
        async signInWithGoogle() {
            const success = await this.$store.dispatch('user/signUpWithGoogle', )
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
    }
}

</script>