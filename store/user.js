//状態管理のみを行うstore
import { auth } from '~/plugins/firebase'
import { updateEmail, updateProfile, GoogleAuthProvider } from "firebase/auth";

// export const state = () => ({
//   isLogin: false,
//   profile: {},
//   name: '',
//   mail: '',
//   pass: '',
//   icon: '',
// })

// export const mutations = {
//   setUser(state, user) {
//     state.isLogin = true
//     state.profile = user || {}
//     state.name = user ? user.displayName : ''
//     state.mail = user ? user.email : ''
//     state.pass = ''
//     state.icon = user ? user.photoURL : ''
//   },
//   loggedIn(state) {
//     state.isLogin = true
//   },
// }

// export const actions = {
//   listenAuthStateChanged({ commit }) {
//     console.log('listenAuthStateChanged is called')
//     const auth = getAuth()
//     onAuthStateChanged(auth, (user) => {
//       commit('setUser', user)
//     })
//   },
// }

export const state = () => ({
  isLogin: false,
//   token: localStorage.getItem('token') || '',
  username: '',
  uid: '',
  profile: {
    name: '',
    mail: '',
    icon: '',
  },
})

export const getters = {
  isLoggedIn: (state) => state.isLogin === true,
}

export const mutations = {
  setUser(state, user) {
    state.isLogin = true
    state.profile.name = user.displayName
    state.profile.mail = user.email
    state.profile.icon = user.photoURL
    state.uid = user.uid
  },
  logout(state) {
    state.isLogin = false
    state.profile.name = ''
  },
  setDisplayName(state, displayName) {
    state.profile.name = displayName
  },
  setMail(state, email) {
    state.profile.name = email
  },
  setIcon(state, photoURL) {
    state.profile.name = photoURL
  },
  setProfile(state, updatedValues) {
    Object.assign(state.profile, updatedValues)
  },
  log(state) {
    console.log(state.profile)
  }
}

export const actions = {
  gotUser({ commit }, user) {
    commit('setUser', user)
  },
//   logout({ commit }) {
//     auth.signOut().then(() => {
//       commit(false)
//     })
//   },

  async update({ commit }, updatedValues) {

    const user = auth.currentUser //ユーザーインスタンスをfirebaseから取得
    
    if (user) {
          await updateEmail(user, updatedValues.mail);
    //   if (updatedValues.hasOwnProperty('password') && updatedValues.password) {
    //     profileUpdates.Email = updatedValues.mail
    //   }
  
      const profileUpdates = {}
      if (updatedValues.hasOwnProperty('icon') && updatedValues.icon) {
        profileUpdates.photoURL = updatedValues.icon
        await updateProfile(user, {
            photoURL: profileUpdates.photoURL
        })
        console.log('アイコンの更新できた')
      }
      if (updatedValues.hasOwnProperty('name') && updatedValues.name) {
        profileUpdates.displayName = updatedValues.name
        await updateProfile(user, {
            displayName: profileUpdates.displayName
        })

        console.log('名前の更新できた')
      }
  
    //   if (Object.keys(profileUpdates).length > 0) {
    //     await updateProfile(user, {
    //         displayName: profileUpdates.displayName,
    //         photoURL: profileUpdates.photoURL,
    //     });
    //     console.log('更新できた')
    //   }
  
      commit('setUser', user)
      commit('log')
    }
  },
}
