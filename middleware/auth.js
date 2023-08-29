//firebaseの認証周り

import { auth } from '~/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function ({ route, store, redirect }) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch('user/gotUser', user)
      // console.log('true')
      //   console.log(store.state.user.uid);
      //   console.log(store.state.user.profile);
    }
    else { //ログインしているユーザーがいないときの処理
      // console.log(route.path)
      store.commit('user/logout')
      if (
        route.path === '/profile/' ||
        route.path === '/write/' ||
        route.path === '/writeNovel/' ||
        route.path === '/myNovels/'
      ) {
        // console.log(route.path)
        redirect('/signup')
        store.commit('common/setIsMounted', true)
      }
    }
  })
}
