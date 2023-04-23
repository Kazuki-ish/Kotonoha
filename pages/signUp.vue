<template>
    <section class="sign-up">
        <div class="sign-up__inner">
            <div class="sign-up__mail">
                <p class="sign-up__mail__txt">メールアドレス</p>
                <input class="sign-up__mail__input" v-model="email" type="email" placeholder="メールアドレス" />
                <p class="sign-up__mail__txt">パスワード</p>
                <input class="sign-up__mail__input" v-model="password" type="password" placeholder="パスワード" />
                <button class="sign-up__mail__btn -login" @click="signUpWithEmail(email, password)">ログインする(仮)</button>
                <button class="sign-up__mail__btn -sign-up" @click="signUpWithEmail(email, password)">新しく登録する</button>
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
        margin-top:24px;
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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/plugins/firebase'

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
        async signInWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);
                // 成功したら、result.user にユーザー情報が格納されています
                console.log('User:', result.user);
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async signUpWithEmail(email, password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            catch (error) {
                console.error(error.message);
            }
            //登録後のログイン処理
            try {
                await signInWithEmailAndPassword(auth, email, password);
                this.$router.push('/');
            }
            catch (error) {
                console.error(error.message);
            }
        },
    }
}

</script>