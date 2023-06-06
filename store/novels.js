import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from 'firebase/firestore'

export const state = () => ({
  userNovels: [],
  currentNovel: null,
  novel: {},
  title: '',
  body: '',
  slug: '',
  novelID: [],
  likedID: [],
  bookmarkID: [],
  bookmarkNum: [],
})

export const mutations = {
  setUserNovels(state, novels) {
    state.userNovels = novels
  },
  setCurrentNovel(state, novel) {
    state.currentNovel = novel
  },
  setTitle(state, title) {
    state.title = title
  },
  setBody(state, body) {
    state.body = body
  },
  setSlug(state, slug) {
    state.slug = slug
  },
  setNovelID(state, novelID) {
    state.novelID = novelID
  },
  setLikedID(state, likedID) {
    state.likedID = likedID
  },
  setBookmarkID(state, bookmarkID) {
    state.bookmarkID = bookmarkID
  },
  setBookmarkNum(state, bookmarkNum) {
    state.bookmarkNum = bookmarkNum
  },
  setNovel(state, { uid, title, body, novelSlug }) {
    if (!state.novel[uid]) {
      state.novel[uid] = {}
    }
    state.novel[uid][novelSlug] = { title, body }
  },
}

// addNovel内で使用
function generateUniqueSlug(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const uniqueId = Date.now().toString(36)
  return `${slug}-${uniqueId}`
}

export const actions = {
  async fetchSingleNovel({ commit }, { uid, slug }) {
    const userDocRef = doc(db, 'novels', uid)
    const userDoc = await getDoc(userDocRef)

    // console.log(uid)
    if (userDoc.exists()) {
      const userData = userDoc.data()

      if (userData.novel && userData.novel[slug]) {
        return {
          id: slug,
          ...userData.novel[slug],
        }
      }
    }
    return null
  },
  async fetchUserNovels({ commit }, userId) {
    const userDocRef = doc(db, 'novels', userId)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      const userNovels = []

      for (const novelSlug in userData.novel) {
        let novelBody = userData.novel[novelSlug].body

        // 144字以上かチェック
        if (novelBody.length > 144) {
          // ...を追加
          novelBody = novelBody.substring(0, 144) + '......'
        }

        userNovels.push({
          id: novelSlug,
          ...userData.novel[novelSlug],
          body: novelBody, // Use the modified novelBody here
        })
      }

      commit('setUserNovels', userNovels)
    } else {
      commit('setUserNovels', [])
    }
  },
  // async fetchNovel({ commit }, novelId) {
  //   const novelDocRef = doc(db, 'novels', novelId);
  //   const novelSnapshot = await getDoc(novelDocRef);

  //   if (novelSnapshot.exists()) {
  //     const novelData = {
  //       id: novelSnapshot.id,
  //       ...novelSnapshot.data(),
  //     };
  //     commit('setCurrentNovel', novelData);
  //   } else {
  //     console.error('No such novel found!');
  //   }
  // },
  async addNovel({ commit }, { uid, title, body }) {
    const novelData = {
      title,
      body,
    }

    const novelSlug = generateUniqueSlug(title)
    const userDocRef = doc(db, 'novels', uid)
    await setDoc(
      userDocRef,
      { novel: { [novelSlug]: novelData } },
      { merge: true }
    )

    commit('setNovel', { uid, title, body, slug: novelSlug.slug })
  },
  async saveNovel({ commit }, { uid, title, body, slug }) {
    const novelData = {
      title,
      body,
    }

    const userDocRef = doc(db, 'novels', uid)

    // 既存のデータを取得
    const userDocSnapshot = await getDoc(userDocRef)
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data()
      console.log(userData)
      const existingNovelData = userData.novel && userData.novel[slug]

      console.log(slug)
      console.log(existingNovelData)
      // 同じidのデータが存在し、テキストが変わっていた場合、データを更新
      if (
        existingNovelData &&
        (existingNovelData.title !== title || existingNovelData.body !== body)
      ) {
        await setDoc(
          userDocRef,
          { novel: { [slug]: novelData } },
          { merge: true }
        )

        commit('setNovel', { uid, title, body, slug: slug })
      }
    } else {
      // 既存のデータがない場合、新たにデータを追加
      await setDoc(
        userDocRef,
        { novel: { [slug]: novelData } },
        { merge: true }
      )

      commit('setNovel', { uid, title, body, slug: slug })
    }
  },

  async fetchLikedNovels({ commit }, uid) {
    const q = query(collection(db, 'likes'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    const likedID = []
    querySnapshot.forEach((doc) => {
      likedID.push(doc.id)
    })
    commit('setLikedID', likedID)
  },
  async fetchBookmarkedNovels({ commit }, uid) {
    // この部分は、Firestore内にしおりデータの構造に応じて実装を変更してください。
    const q = query(collection(db, 'bookmarks'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    const bookmarkID = []
    const bookmarkNum = []
    querySnapshot.forEach((doc) => {
      bookmarkID.push(doc.id)
      bookmarkNum.push(doc.data().bookmarkNum)
    })
    commit('setBookmarkID', bookmarkID)
    commit('setBookmarkNum', bookmarkNum)
  },
}
