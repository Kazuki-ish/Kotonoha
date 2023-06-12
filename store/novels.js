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
  Timestamp,
} from 'firebase/firestore'

export const state = () => ({
  userNovels: [],
  newNovels:[],
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
  setNewNovels(state, novels) {
    state.newNovels = novels
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
  async fetchUserNovels({ commit }) {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          const userDocRef = doc(db, 'novels', user.uid)
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
                timestamp: userData.novel[novelSlug].timestamp, // Add the timestamp here
              })
            }
  
            // Sort the novels array by timestamp
            userNovels.sort((a, b) => b.timestamp - a.timestamp)
  
            commit('setUserNovels', userNovels)
          } else {
            commit('setUserNovels', [])
          }
          resolve()
        } else {
          // No user is signed in.
          commit('setUserNovels', [])
          resolve()
        }
      })
    })
  },
  
  async fetchNewNovels({ commit }) {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          const newNovelsRef = collection(db, 'new')
          const newNovelsSnapshot = await getDocs(newNovelsRef)
  
          const newNovels = newNovelsSnapshot.docs.map((doc) => {
            let novelBody = doc.data().body
  
            // 144字以上かチェック
            if (novelBody.length > 144) {
              // ...を追加
              novelBody = novelBody.substring(0, 144) + '......'
            }
  
            const timestamp = doc.data().timestamp // Directly use the timestamp property from the doc data
            const slug = doc.data().slug; // Retrieve slug from the document data
  
            console.log(slug)
  
            return {
              id: slug, // Use slug as the id
              ...doc.data(),
              body: novelBody, // Use the modified novelBody here
              timestamp: timestamp, // Use the timestamp from the doc data
            }
          })
  
          // Sort the novels array by timestamp
          newNovels.sort((a, b) => {
            // Compare using seconds first, and then nanoseconds if seconds are equal
            return (
              b.timestamp.seconds - a.timestamp.seconds ||
              b.timestamp.nanoseconds - a.timestamp.nanoseconds
            )
          })
  
          commit('setNewNovels', newNovels)
          resolve()
        } else {
          // No user is signed in.
          commit('setNewNovels', [])
          resolve()
        }
      })
    })
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
  async saveNovel({ rootState, commit }, { uid, title, body, slug }) {
    const name = rootState.user.profile.name // プロファイルからnameを取得
    const timestamp = Timestamp.now()
    const novelData = {
      title,
      body,
      name,
      timestamp,
    }

    const userDocRef = doc(db, 'novels', uid)
    const newDocRef = doc(db, 'new', timestamp.toString()) // timestampを文字列に変換してIDとして使用

    // 既存のデータを取得
    const userDocSnapshot = await getDoc(userDocRef)
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data()
      const existingNovelData = userData.novel && userData.novel[slug]

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

        // 新しいドキュメントへの保存
        await setDoc(
          newDocRef,
          { uid, title, body, slug, name, timestamp },
          { merge: true }
        )

        commit('setNovel', {
          uid,
          title,
          body,
          name,
          slug: slug,
          timestamp: timestamp,
        }) // Include name and timestamp in the commit
      }
    } else {
      // 既存のデータがない場合、新たにデータを追加
      await setDoc(
        userDocRef,
        { novel: { [slug]: novelData } },
        { merge: true }
      )

      // 新しいドキュメントへの保存
      await setDoc(
        newDocRef,
        { uid, title, body, slug, name, timestamp },
        { merge: true }
      )

      commit('setNovel', {
        uid,
        title,
        body,
        name,
        slug: slug,
        timestamp: timestamp,
      }) // Include name and timestamp in the commit
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
