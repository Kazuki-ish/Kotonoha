//状態管理のみを行うstore
import { auth } from '~/plugins/firebase'
import { updateEmail, updateProfile, GoogleAuthProvider } from 'firebase/auth'

import { storage } from '~/plugins/firebase'
import { ref as fbRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const state = () => ({
  isLogin: false,
  editProfile: true,
  //   token: localStorage.getItem('token') || '',
  username: '',
  uid: '',
  icon: '',
  profile: {
    name: '',
    mail: '',
  },
})

export const getters = {
  isLoggedIn: (state) => state.isLogin === true,
}

export const mutations = {
  setUser(state, user) {
    state.isLogin = true
    state.icon = user.photoURL
    state.uid = user.uid
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
      }
      if (updatedValues.hasOwnProperty('name') && updatedValues.name) {
        profileUpdates.displayName = updatedValues.name
        await updateProfile(user, {
          displayName: profileUpdates.displayName,
        })

        // console.log('名前の更新できた')
      }

      commit('setUser', user)
      commit('log')
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
