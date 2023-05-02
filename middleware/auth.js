//firebaseの認証周り

import { auth } from '~/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function ({ route, store, redirect }) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit('user/setUser', user)
      store.dispatch('user/gotUser', user)
      //   console.log(user);
      //   console.log(store.state.user);
      //   console.log(store.state.user.uid);
      //   console.log(store.state.user.profile);
    } else {
      store.commit('user/logout')
      //   if (route.name !== 'login') redirect('/login')
    }
  })
}