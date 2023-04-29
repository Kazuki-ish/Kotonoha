import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import { collection, addDoc, query, where, getDocs, getDoc, setDoc, doc} from 'firebase/firestore'

export const state = () => ({
  userNovels: [],
  currentNovel: null,
  novel:{},
  title: '',
  body: '',
  novelID: [],
  likedID: [],
  bookmarkID: [],
  bookmarkNum: []
})

export const mutations = {
  setUserNovels(state, novels) {
    state.userNovels = novels;
  },
  setCurrentNovel(state, novel) {
    state.currentNovel = novel;
  },
  setTitle(state, title) {
    state.title = title;
  },
  setBody(state, body) {
    state.body = body;
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
      state.novel[uid] = {};
    }
    state.novel[uid][novelSlug] = { title, body }; 
  },
}

// addNovel内で使用
function generateUniqueSlug(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const uniqueId = Date.now().toString(36);
  return `${slug}-${uniqueId}`;
}

export const actions = {
  async fetchUserNovels({ commit }, userId) {
    const userDocRef = doc(db, 'novels', userId);
    const userDoc = await getDoc(userDocRef);
  
    if (userDoc.exists()) {
      console.log(userDoc)
      const userData = userDoc.data();
      const userNovels = [];
  
      for (const novelSlug in userData.novel) {
        userNovels.push({
          id: novelSlug,
          ...userData.novel[novelSlug],
        });
      }
  
      commit('setUserNovels', userNovels);
    } else {
      commit('setUserNovels', []);
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
    };

    const novelSlug = generateUniqueSlug(title);
    const userDocRef = doc(db, 'novels', uid);
    await setDoc(userDocRef, { novel: { [novelSlug]: novelData } }, { merge: true });

    commit('setNovel', { uid, title, body, slug: novelSlug.slug }); 
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
