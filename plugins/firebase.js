//環境変数の設定　初期化用のファイル

import { initializeApp } from "firebase/app";
import { getAuth, updateEmail } from "firebase/auth";

// const provider = new GoogleAuthProvider();

const config = {
    apiKey: "AIzaSyDVvp4Azn0-GsPBKnzV4yVBdS916QlkFo8",
    authDomain: "kotonoha-657ec.firebaseapp.com",
    databaseURL: "https://kotonoha-657ec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kotonoha-657ec",
    storageBucket: "kotonoha-657ec.appspot.com",
    messagingSenderId: "260494483607",
    appId: "1:260494483607:web:4eb74e2870b20fa7ce09d2",
    measurementId: "G-QS7MXC5P3H"
}
// const firebase = Firebase.apps.length? Firebase.app():Firebase.initializeApp(config);

const app = initializeApp(config);
export const auth = getAuth();
export { updateEmail };