//状態管理のみを行うstore
import { auth } from '~/plugins/firebase'
import { signInWithPopup, updateEmail, updateProfile, GoogleAuthProvider } from 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, getUserByIdToken } from 'firebase/auth'

import { storage } from '~/plugins/firebase'
import {
  ref as fbRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

export const state = () => ({
  isLogin: false,
  editProfile: true,
  editNovel: true,
  //   token: localStorage.getItem('token') || '',
  username: '',
  uid: '',
  icon: '',
  profile: {
    name: '',
    mail: '',
  },
  hasMessage: false,
  messageText: '',
})

export const getters = {
  isLoggedIn: (state) => state.isLogin === true,
}

export const mutations = {
  setUser(state, user) {
    state.isLogin = true
    state.icon = user.photoURL
    if (user.uid) {
      state.uid = user.uid
    }
    state.profile.name = user.displayName
    state.profile.mail = user.email
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
    state.icon = photoURL
  },
  setProfile(state, updatedValues) {
    Object.assign(state.profile, updatedValues)
  },
  log(state) {
    console.log(state)
  },
  toggleMode(state) {
    state.editProfile = !state.editProfile
    // console.log(state.editProfile);
  },
  toggleNovelMode(state) {
    state.editNovel = !state.editNovel
    // console.log(state.editProfile);
  },
  setMode(state, pageName) {
    if (pageName == 'profile') {
      state.editProfile = true
    } else {
      state.editProfile = false
    }
    if (pageName == 'myNovels') {
      state.editNovel = true
    } else {
      state.editNovel = false;
    }
    // console.log(state.editProfile);
  },
}

export const actions = {

  async setUserFromAuth (commit,) {
    const user = auth.currentUser;
    commit('setUser', user);
  },
  async signUpWithGoogle(dispatch,) {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // 成功したら、result.user にユーザー情報が格納されています
        // console.log('User:', result.user);
        dispatch('common/setMessage', 'Googleでログインしました', { root: true })
        return true; // 成功した場合は true を返す
    } catch (error) {
        // console.error('Error:', error);
        dispatch('common/setMessage', error, { root: true })
        return false; // エラーが発生した場合は false を返す
    }
},

  async signUpWithEmail({ commit, dispatch }, { email, password }) {
    //!!メールアドレスの確認セクション!!
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //   // メールアドレス確認メールを送信
    //   if (userCredential.user) {
    //     await sendEmailVerification(auth.currentUser);
    //     console.log('Verification email sent.');
    //     return true; // 成功した場合は true を返す
    //   }
    // } catch (error) {
    //   console.error(error.message);
    //   return false; // エラーが発生した場合は false を返す
    // }

    // 登録後のログイン処理
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch('common/setMessage', '登録して、ログインしました', { root: true })
      commit('setUser', auth.currentUser);
    } catch (error) {
      // console.error(error.message); 
      dispatch('common/setMessage', error.message, { root: true })
      
      
    }
  },
  async signIn( {commit,dispatch}, {email, password}){
    try {
      await signInWithEmailAndPassword(auth, email, password);
      commit('setUser', auth.currentUser);

      dispatch('common/setMessage', 'ログインしました', { root: true })
      
      return true; // 成功した場合は true を返す
    } catch (error) {
      // console.error(error.message);
      dispatch('common/setMessage', error.message, { root: true })
      return false; // エラーが発生した場合は false を返す
    }
  },
  gotUser({ commit, state }, user) {
    commit('setUser', user)
  },
  async logOut({ commit, dispatch }) {
    try {
      await auth.signOut();
      dispatch('common/setMessage', 'ログアウトしました', { root: true })
      commit('setUser', false);
    } catch (error) {
      // console.error('Error during sign out:', error);
      dispatch('common/setMessage', error, { root: true })
    }
  },

  async update({ commit, dispatch }, updatedValues) {
    const user = auth.currentUser //ユーザーインスタンスをfirebaseから取得

    if (user) {
      await updateEmail(user, updatedValues.mail)
      //   if (updatedValues.hasOwnProperty('password') && updatedValues.password) {
      //     profileUpdates.Email = updatedValues.mail
      //   }

      const profileUpdates = {}
      if (updatedValues.hasOwnProperty('icon') && updatedValues.icon) {
        profileUpdates.photoURL = updatedValues.icon
        await updateProfile(user, {
          photoURL: profileUpdates.photoURL,
        })
        // console.log('アイコンの更新できた')
        dispatch('common/setMessage', 'アイコンを更新しました', { root: true })
      }
      if (updatedValues.hasOwnProperty('name') && updatedValues.name) {
        profileUpdates.displayName = updatedValues.name
        await updateProfile(user, {
          displayName: profileUpdates.displayName,
        })

        dispatch('novels/updateNovelProfile', user, { root: true })
        
        // console.log('名前の更新できた')
        dispatch('common/setMessage', '表示名を更新しました', { root: true })
      }

      commit('setUser', user)
      // commit('log')
    }
  },
  async resizeImage({ commit }, { file, maxWidth, maxHeight }) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const aspectRatio = img.width / img.height

        let width, height
        if (img.width > img.height) {
          width = maxWidth
          height = Math.round(width / aspectRatio)
        } else {
          height = maxHeight
          width = Math.round(height * aspectRatio)
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(resolve, file.type)
      }
      img.onerror = reject
    })
  },
  async uploadIconImage({ commit, dispatch }, { uid, imageFile }) {
    if (imageFile) {
      // 画像をリサイズ
      const resizedImage = await dispatch('resizeImage', {
        file: imageFile,
        maxWidth: 128,
        maxHeight: 128,
      })

      const fileExtension = imageFile.name.split('.').pop()

      // 現在のアイコン画像がある場合、削除
      //   const currentIconURL = this.state.user.icon
      //   if (currentIconURL) {
      //     const currentStorageRef = fbRef(storage, currentIconURL)
      //     await deleteObject(currentStorageRef)
      //   }

      // ユーザーのUIDをパスに含めます
      const filePath = `user-icons/${uid}/${Date.now()}.${fileExtension}`

      const storageRef = fbRef(storage, filePath)
      await uploadBytes(storageRef, resizedImage)

      const downloadURL = await getDownloadURL(storageRef)
      //   console.log('Image URL:', downloadURL)

      // プロフィールのiconを更新
      const user = auth.currentUser
      if (user) {
        await updateProfile(user, {
          photoURL: downloadURL,
        })
        commit('setIcon', downloadURL)
      }
    }
  },
}
