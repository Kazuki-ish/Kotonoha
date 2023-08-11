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
  updateDoc,
  doc,
  Timestamp,
  deleteField,
  deleteDoc,
  writeBatch,
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
  removeNovel(state, { uid, novelSlug }) {
    if (state.novel[uid]) {
      delete state.novel[uid][novelSlug];
  
      // もし特定の uid の下に何も小説がない場合は、その uid のオブジェクト自体も削除します。
      if (Object.keys(state.novel[uid]).length === 0) {
        delete state.novel[uid];
      }
    }
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
  
  async fetchNewNovels({ commit,dispatch }) {
    return new Promise(async (resolve) => {
      // User is signed in or not, the code should run
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
  
        // console.log(slug)
  
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

      dispatch('fetchAllNewNovels')

      commit('setNewNovels', newNovels)
      resolve()
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
  async saveNovel({ rootState, commit, dispatch }, { uid, title, body, slug }) {
    const name = rootState.user.profile.name // プロファイルからnameを取得
    const timestamp = Timestamp.now()

    if (!slug) {
      slug = generateUniqueSlug(title)
    }
    // console.log(`saveNovel called with uid=${uid}, title=${title}, body=${body}, slug=${slug}`); // Add this line

    const novelData = {
      title,
      body,
      name,
      timestamp,
      slug,
    }

    const userDocRef = doc(db, 'novels', uid)
    const newDocRef = doc(db, 'new', `${timestamp.toString()}`) // timestampとslugを文字列に変換してIDとして使用

    // uidに一致するドキュメントが存在しない場合は新規ドキュメントを作成
    await setDoc(userDocRef, {}, { merge: true })

    // console.log('saveNovel実行中')

    // 既存のデータを取得
    const userDocSnapshot = await getDoc(userDocRef)
    // console.log(userDocSnapshot)
    
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data()
      const existingNovelData = userData.novel && userData.novel[slug]

      // 同じidのデータが存在し、テキストが変わっていた場合、データを更新
      if ( //ここのelse分岐がないためreturnしてしまっている。今のところ下のelse文をコピーしておくが、今後整頓が必要
        existingNovelData &&
        (existingNovelData.title !== title || existingNovelData.body !== body)
      ) {
        await setDoc(
          userDocRef,
          { novel: { [slug]: novelData } },
          { merge: true }
        )
        //まず既存のノベルをnewから削除
        await dispatch('deleteNewNovel', { uid, slug })

        // 新しいドキュメントへの保存
        await setDoc(
          newDocRef,
          { uid, title, body, slug, name, timestamp },
          { merge: true }
        )

        dispatch('common/setMessage', '小説を更新しました', { root: true })

        commit('setNovel', {
          uid,
          title,
          body,
          name,
          slug: slug,
          timestamp: timestamp,
        }) // Include name and timestamp in the commit
      }
      else {//docが確認できなかったため新規データ追加
        await setDoc(
          userDocRef,
          { novel: { [slug]: novelData } },
          { merge: true }
        )
        // console.log('新規データ追加中')
  
        // newドキュメントへの保存
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
      console.log('新規データ追加中')

      // newドキュメントへの保存
      await setDoc(
        newDocRef,
        { uid, title, body, slug, name, timestamp },
        { merge: true }
      )

      dispatch('common/setMessage', '新しい小説を保存しました', { root: true })

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

  //これからここを書きます
  async setNovel({}){},
  async createNovel({state, commit, dispatch}, {uid, title, body, name, slug, timestamp}){

  },
  async updateNovel({}){

  },

  async deleteNovel({ state, commit, dispatch }, { uid, slug }) {
    // console.log(state.novel)
    // refを定義
    const docRef = doc(db, 'novels', uid);
  
    // ノベルを消す
    const updateData = {};
    updateData[`novel.${slug}`] = deleteField(); // deleteField() is imported from "firebase/firestore"
  
    // ドキュメントをアップデート
    await updateDoc(docRef, updateData);

    //アクションを呼び出してnewからも削除
    await dispatch('deleteNewNovel', { uid, slug })

    // console.log(newDocumentName)

    // console.log(state.novel)
    commit('removeNovel', {uid, slug} );
  },

  async deleteNewNovel({dispatch}, {uid, slug}) {
    // findNewNovelアクションを呼び出してドキュメント名を取得
    const newDocumentName = await dispatch('findNewNovel', { uid, slug });
  
    // もしドキュメント名が見つかった場合、そのドキュメントを削除
    if (newDocumentName) {
      const docRef = doc(db, 'new', newDocumentName); // 見つかったドキュメントへの参照を作成
      await deleteDoc(docRef); // ドキュメントを削除
      dispatch('common/setMessage', '小説を削除しました', { root: true })
    }
    else {
      dispatch('common/setMessage', 'エラー:トップページから削除できませんでした', { root: true })
    }
  },
  
  async findNewNovel({ commit, dispatch }, { uid, slug }) {
    const newCollectionRef = collection(db, 'new');
    const querySnapshot = await getDocs(newCollectionRef);

    const documents = querySnapshot.docs.map((doc) => {
      return {
        timestamp: doc.id, // ドキュメントのID (Timestamp)
        slug: doc.data().slug, // slugフィールド
        uid: doc.data().uid  // uidフィールド
      };
    });

    // documents配列を検索し、指定されたuidとslugと一致するオブジェクトを見つける
    const matchingDocument = documents.find(document => document.uid === uid && document.slug === slug);

    // 一致するドキュメントが見つかった場合、そのtimestampプロパティを返す
    if (matchingDocument) {
      return matchingDocument.timestamp;
    }

    dispatch('common/setErrorMessage', 'findエラー', { root: true })

    // 一致するドキュメントが見つからない場合、nullを返す
    return null;
  },

  async updateNovelProfile({commit, dispatch}, user) {
    const uid = user.uid;
    const updatedName = user.displayName;
    
    console.log(user.displayName)

    // findNewNovelアクションを呼び出してドキュメント名を取得
    const allNewNovels = await dispatch('fetchAllNewNovels', { uid });
    
    //配列を初期化
    const matchingTimestamps = [];

    for (const key in allNewNovels) {
      //各オブジェクトからへ代入する準備
      if (allNewNovels.hasOwnProperty(key)) {
        const timestampKey = Object.keys(allNewNovels[key])[0];
        const obj = allNewNovels[key][timestampKey];
    
        // console.log(obj.uid);
    
        if (obj.uid === uid) {
          matchingTimestamps.push(timestampKey);
          //uidが一致したら配列へ代入
        }
      }
    }
    
    // 一致するTimestampが見つかった場合、そのTimestampの配列を返す
    if (matchingTimestamps.length > 0) {

      // Promise.allを使用して、全ての更新を並行して行う
      await Promise.all(matchingTimestamps.map(async (timestamp) => {
       
        const newCollectionRef = collection(db, 'new');

        // 各Timestampに対応するドキュメントへの参照を取得
        const timestampDocRef = doc(newCollectionRef, timestamp);

        // nameコレクションへの参照を取得
        const nameCollectionRef = collection(timestampDocRef, 'name');

        // 更新
        await setDoc(timestampDocRef, {name: updatedName }, {merge: true});

        console.log('バッチ処理完了');
      }));
    }

    // 一致するTimestampが見つからない場合、nullを返す
    return;
  },

  async fetchAllNewNovels({ commit }) {
    const newCollectionRef = collection(db, 'new');
    const querySnapshot = await getDocs(newCollectionRef);
  
    // 全てのドキュメントを取得してオブジェクトの配列に代入
    const allNewDocuments = querySnapshot.docs.map((doc) => {
      return {
        [doc.id]: { // Timestampがキーとなります
          slug: doc.data().slug, // slugフィールド
          uid: doc.data().uid  // uidフィールド
        }
      };
    });
  
    // commitなど、必要に応じて他の操作をここに追加できます
    // console.log(allNewDocuments)

    return allNewDocuments; // オブジェクトの配列を返す
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
