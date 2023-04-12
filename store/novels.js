import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import { collection, addDoc, query, where, getDocs , setDoc, doc} from 'firebase/firestore'

export const state = () => ({
  novel:{},
  title: '',
  body: '',
  novelID: [],
  likedID: [],
  bookmarkID: [],
  bookmarkNum: []
})

export const mutations = {
  setBody(state, body) {
    state.body = body
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
  setNovel(state, { uid, title, body }) {
    if (!state.novel[uid]) {
      state.novel[uid] = {};
    }
    state.novel[uid][title] = { body };
  },
}

export const actions = {
  async addNovel({ commit }, { uid, title, body }) {
    const novelData = {
      title,
      body
    };
  
    const userDocRef = doc(db, 'novel', uid);
    await setDoc(userDocRef, { novel: { [title]: novelData } }, { merge: true });
  
    commit('setNovel', { uid, title, body });
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
  }
}
