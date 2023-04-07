<template>
    <section class="sign-up">
        <div class="sign-up__mail">
            <input v-model="email" type="email" placeholder="メールアドレス" />
            <input v-model="password" type="password" placeholder="パスワード" />
            <button @click="signUpWithEmail(email, password)">メールアドレスで登録する</button>
        </div>
        <div class="sign-up__google">
            <button @click="signInWithGoogle" class="">
                Googleで登録
            </button>
        </div>
    </section>
 </template>
 
 <script>
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '~/plugins/firebase'

 export default {
    data() {
        return {
            email: '',
            password: '',
        };
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