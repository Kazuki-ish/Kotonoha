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
  newNovels: [],
  currentNovel: null,
  novel: {},
  readingNovel: {},
  title: '',
  body: '',
  slug: '',
  novelID: [],
  isFavorite: false,
  isCoolTime: false,
  isBookmark: false,
  bookmarks: [],
  beAbleBookmark: false,
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
  setReadingNovel(state, novel) {
    if(novel) {
      state.readingNovel = novel
    }
  },
  setIsFavorite(state, boolarn) {
    state.isFavorite = boolarn
  },
  setIsBookmark(state, boolarn) {
    state.isBookmark = boolarn
  },
  setBookmarks(state, array) {
    state.bookmarks = array
  },
  setBeAbleBookmark(state, boolarn) {
    state.beAbleBookmark = boolarn
  },
  removeNovel(state, { uid, novelSlug }) {
    if (state.novel[uid]) {
      delete state.novel[uid][novelSlug]

      // もし特定の uid の下に何も小説がない場合は、その uid のオブジェクト自体も削除します。
      if (Object.keys(state.novel[uid]).length === 0) {
        delete state.novel[uid]
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
  async fetchSingleNovel({ state, commit }, { uid, slug }) {
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

  async fetchNewNovels({ commit, dispatch }) {
    return new Promise(async (resolve) => {
      const newNovelsRef = collection(db, 'new')
      const newNovelsSnapshot = await getDocs(newNovelsRef)

      const novelsPromises = await newNovelsSnapshot.docs.map(async (document) => {

        const timestamp = document.data().timestamp
        const slug = document.data().slug
        const uid = document.data().uid
        // console.log(slug)

        // //slugをキーにしてnovels内から本文データを取得したい 非同期関数でソートが処理されないため今のところ無理
        const userDocRef = doc(db, 'novels', uid)
        const userDoc = await getDoc(userDocRef)
        
        const novelDocRef = doc(db, 'novels', uid )
        const novelDocSs = await getDoc(novelDocRef)
        const novelDoc = novelDocSs.data()
        let novelBody = novelDoc.novel[slug].body

        const favNumber = novelDoc.novel[slug].favorites ? 
          novelDoc.novel[slug].favorites.length ? novelDoc.novel[slug].favorites.length : null 
        : null

      // console.log(favNumber)
      // console.log(novelDoc.novel[slug].favorites)

      // 144字以上かチェック
      if (novelBody.length > 144) {
        // ...を追加前に、144文字目までの部分文字列を取得
        let substringBody = novelBody.substring(0, 144);

        // 途中で切れたタグを削除（例: <b, <br, ...）
        substringBody = substringBody.replace(/<[^>]*$/, '');

        // 連続したbrタグが5つ以下の場合に、それを削除
        substringBody = substringBody.replace(/(<br\s*\/?>\s*){1,5}$/, '');

        // ...を追加
        novelBody = substringBody + '......';
      }
        // console.log(novelBody)
        return {
          id: slug, // Use slug as the id
          ...document.data(),
          body: novelBody, // Use the modified novelBody here
          timestamp: timestamp, // Use the timestamp from the doc data
          favNumber: favNumber,
        }
      })
      // 全てのPromiseが解決するのを待ちます
      const newNovels = await Promise.all(novelsPromises);

      newNovels.sort((a, b) => {
        return (
          b.timestamp.seconds - a.timestamp.seconds ||
          b.timestamp.nanoseconds - a.timestamp.nanoseconds
        )
      })

      // dispatch('fetchAllNewNovels')

      commit('setNewNovels', newNovels)
      resolve()
    })
  },
  async findNewNovel({ commit, dispatch }, { uid, slug }) {
    const newCollectionRef = collection(db, 'new')
    const querySnapshot = await getDocs(newCollectionRef)

    const documents = querySnapshot.docs.map((doc) => {
      return {
        timestamp: doc.id, // ドキュメントのID (Timestamp)
        slug: doc.data().slug, // slugフィールド
        uid: doc.data().uid, // uidフィールド
      }
    })

    // documents配列を検索し、指定されたuidとslugと一致するオブジェクトを見つける
    const matchingDocument = documents.find(
      (document) => document.uid === uid && document.slug === slug
    )

    // 一致するドキュメントが見つかった場合、そのtimestampプロパティを返す
    if (matchingDocument) {
      return matchingDocument.timestamp
    }

    dispatch('common/setMessage', '小説が見つかりませんでした', { root: true })

    // 一致するドキュメントが見つからない場合、nullを返す
    return null
  },
  async fetchAllNewNovels({ commit }) {
    const newCollectionRef = collection(db, 'new')
    const querySnapshot = await getDocs(newCollectionRef)

    // 全てのドキュメントを取得してオブジェクトの配列に代入
    const allNewDocuments = querySnapshot.docs.map((doc) => {
      return {
        [doc.id]: {
          // Timestampがキーとなります
          slug: doc.data().slug, // slugフィールド
          uid: doc.data().uid, // uidフィールド
        },
      }
    })

    // commitなど、必要に応じて他の操作をここに追加できます
    // console.log(allNewDocuments)

    return allNewDocuments // オブジェクトの配列を返す
  },

  async saveNovel({ rootState, commit, dispatch }, { uid, title, body, slug, isPublic }) {
    const name = rootState.user.profile.name
    const timestamp = Timestamp.now()
    if (!slug) {
      slug = generateUniqueSlug(title)
    }
    
    const novelData = {
      title,
      body,
      name,
      timestamp,
      slug,
      isPublic,
    }

    const userDocRef = doc(db, 'novels', uid)
    const newDocRef = doc(db, 'new', `${timestamp.toString()}`) // timestampとslugを文字列に変換してIDとして使用

    // uidに一致するドキュメントが存在しない場合は新規ドキュメントを作成
    await setDoc(userDocRef, {}, { merge: true })

    // 既存のデータを取得
    const userDocSnapshot = await getDoc(userDocRef)

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data()
      const existingNovelData = userData.novel && userData.novel[slug]

      // 同じidのデータが存在し、テキストが変わっていた場合、データを更新
      if (
        existingNovelData && (existingNovelData.title !== title || existingNovelData.body !== body)
      ) {
        await setDoc(
          userDocRef,
          { novel: { [slug]: novelData } },
          { merge: true }
        )

        if( isPublic ){ //公開する場合newへ保存する
          //まず既存のノベルをnewから削除
          await dispatch('deleteNewNovel', { uid, slug })

          // newドキュメントへの保存
          await setDoc(
            newDocRef,
            { uid, title, body, slug, name, timestamp },
            { merge: true }
          )
        }

        dispatch('common/setMessage', '小説を更新しました', { root: true })

        commit('setNovel', {
          uid,
          title,
          body,
          name,
          slug: slug,
          timestamp: timestamp,
        })
      } else {  //docが確認できなかったため新規データ追加
        await setDoc(
          userDocRef,
          { novel: { [slug]: novelData } },
          { merge: true }
        )
        // console.log('新規データ追加中')

        if(isPublic){ //公開する場合にnewへ保存
          // newドキュメントへの保存
          await setDoc(
            newDocRef,
            { uid, title, body, slug, name, timestamp },
            { merge: true }
          )
        }

        commit('setNovel', {
          uid,
          title,
          body,
          name,
          slug: slug,
          timestamp: timestamp,
        })
      }
    } else {
      // 既存のデータがない場合、新たにデータを追加
      await setDoc(
        userDocRef,
        { novel: { [slug]: novelData } },
        { merge: true }
      )
      // console.log('新規データ追加中')

      // newドキュメントへの保存
      if (isPublic){
        await setDoc(
          newDocRef,
          { uid, title, body, slug, name, timestamp },
          { merge: true }
        )
      }

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
  async createNovel(
    { state, commit, dispatch },
    { uid, title, body, name, slug, isPublic, timestamp }
  ) {

  },
  async updateNovel({

  }) {},

  async deleteNovel({ state, commit, dispatch }, { uid, slug }) {
    // console.log(state.novel)
    // refを定義
    const docRef = doc(db, 'novels', uid)

    // ノベルを消す
    const updateData = {}
    updateData[`novel.${slug}`] = deleteField() // deleteField() is imported from "firebase/firestore"

    // ドキュメントをアップデート
    await updateDoc(docRef, updateData)

    //アクションを呼び出してnewからも削除
    await dispatch('deleteNewNovel', { uid, slug })

    // console.log(newDocumentName)

    // console.log(state.novel)
    commit('removeNovel', { uid, slug })
  },

  async deleteNewNovel({ dispatch }, { uid, slug }) {
    // findNewNovelアクションを呼び出してドキュメント名を取得
    const newDocumentName = await dispatch('findNewNovel', { uid, slug })

    // もしドキュメント名が見つかった場合、そのドキュメントを削除
    if (newDocumentName) {
      const docRef = doc(db, 'new', newDocumentName) // 見つかったドキュメントへの参照を作成
      await deleteDoc(docRef) // ドキュメントを削除
      dispatch('common/setMessage', '小説を削除しました', { root: true })
    } else {
      dispatch(
        'common/setMessage',
        'エラー:トップページから削除できませんでした',
        { root: true }
      )
    }
  },

  async updateNovelProfile({ commit, dispatch }, user) {
    const uid = user.uid
    const updatedName = user.displayName

    // console.log(user.displayName)

    // fetchAllNewNovelsアクションを呼び出してドキュメント名を取得
    const allNewNovels = await dispatch('fetchAllNewNovels', { uid })

    //配列を初期化
    const matchingTimestamps = []
    const matchingNovels = []

    for (const key in allNewNovels) {
      //各オブジェクトからへ代入する準備
      if (allNewNovels.hasOwnProperty(key)) {
        const timestampKey = Object.keys(allNewNovels[key])[0]
        const obj = allNewNovels[key][timestampKey]
        
        // console.log(obj.uid);

        if (obj.uid === uid) {
          matchingTimestamps.push(timestampKey) //uidが一致したら配列へ代入
          matchingNovels.push(obj.slug) //slugをnovels配列へ代入
        }
      }
    }

    // 一致するTimestampが見つかった場合、そのTimestampの配列を返す
    if (matchingTimestamps.length > 0) {
      // Promise.allを使用して、全ての更新を並行して行う
      await Promise.all(
        matchingTimestamps.map(async (timestamp) => {
          const newCollectionRef = collection(db, 'new')

          // 各Timestampに対応するドキュメントへの参照を取得
          const timestampDocRef = doc(newCollectionRef, timestamp)

          // 更新
          await setDoc(timestampDocRef, { name: updatedName }, { merge: true })
        })
      )
      // console.log('処理完了');
    }

    // novels側の処理
    await Promise.all(
      matchingNovels.map(async (novelSlug) => {
        const userDocRef = doc(db, 'novels', uid)
        const updatedValue = { name: updatedName }

        // 更新
        await setDoc(userDocRef, { novel: { [novelSlug]:updatedValue } }, { merge: true })
      })
    )
  },
  async fetchIsFavorited({ rootState, commit}, {uid, slug}) {
    const favoriteUid = rootState.user.uid;
  
    const novelRef = doc(db, 'novels', uid);
    const docSnap = await getDoc(novelRef);
    const data = docSnap.data();

    if ( data.novel[slug].favorites && data.novel[slug].favorites.includes(favoriteUid)) {
      commit('setIsFavorite', true);
    }
    else{
      commit('setIsFavorite', false);
    }
  },
  async fetchFavoritedNumber({},{uid, slug}) {

    //firebaseからnovels直下のドキュメントフィールドを参照
    const novelRef = doc(db, 'novels', uid)
    const docSnap = await getDoc(novelRef);
    const data = docSnap.data();

    if (data.novel[slug].favorites) {
      return data.novel[slug].favorites.length;
    }
    else {
      return null;
    }
  },
  async addFavorite({ rootState, state, commit } ) {
    const uid = state.readingNovel.uid;
    const slug = state.readingNovel.slug;
    // ボタンを押したユーザーのuid
    const favoriteUid = rootState.user.uid;
    
    // slugの直下のドキュメントへの参照
    const novelRef = doc(db, 'novels', uid)
    // console.log(novelRef)
  
    const docSnap = await getDoc(novelRef);
    // console.log(docSnap)
  
    const data = docSnap.data();
    // console.log(data)

    //favorite項目がなければ配列として生成
    if (!data.novel[slug].favorites) {
      data.novel[slug].favorites = [];
    }

    //favUidがなければ配列に追加してupdate
    if (!data.novel[slug].favorites.includes(favoriteUid)) {
      data.novel[slug].favorites.push(favoriteUid);
      await updateDoc(novelRef, {
        [`novel.${slug}`]: data.novel[slug]
      });
      commit('setIsFavorite', true);
    }

    //favUidがあれば配列から削除してupdate
    else if (data.novel[slug].favorites.includes(favoriteUid)) {
      //uidが一致する配列の番号を取得
      const arrayNumber = data.novel[slug].favorites.indexOf(favoriteUid);
      // console.log(arrayNumber)
      
      // n番目の数値を配列から削除してその長さ分詰める
      data.novel[slug].favorites.splice(arrayNumber, 1);
      await updateDoc(novelRef, {
        [`novel.${slug}`]: data.novel[slug]
      });
      // console.log(data.novel[slug])
      commit('setIsFavorite', false);
    }
  },
  async fetchIsBookmarked({ rootState, commit},{novel_uid, slug}) {
    const uid = rootState.user.uid;
  
    // console.log(novel_uid)

    const userRef = doc(db, 'users', uid );
    let docSnap = await getDoc(userRef);
    let data = docSnap.data();

    // console.log(docSnap.data())

    if (!data || !data.bookmarks){
      //userdocがあるかチェックして、なければ配置する
      await setDoc(userRef,{
        bookmarks: {} // ここをオブジェクトとして初期化
      }, { merge: true })

      // docデータを更新
      docSnap = await getDoc(userRef);
      data = docSnap.data();
    }

    // bookmarks配列にnoveluidが含まれているかチェック
    if (!(novel_uid in data.bookmarks)) {

    // console.log(data.bookmarks)
      // 含まれていなければ追加
      const updatedBookmarks = {
        ...data.bookmarks, // 既存の bookmarks オブジェクトを展開
        [novel_uid]: {} // 新しいキーと値のペアを追加
      };
      console.log(updatedBookmarks)
      await updateDoc(userRef, { bookmarks: updatedBookmarks });

      // docデータを更新
      docSnap = await getDoc(userRef);
      data = docSnap.data();
      
    }
    if (
        !(slug in data.bookmarks[novel_uid] || !(slug in data.bookmarks[novel_uid][slug]))
      ) { //novel_uidかslugがない場合

        await updateDoc(userRef, {
          [`bookmarks.${novel_uid}.${slug}`]: [] // 配列で初期化
        });

        // docデータを更新
        docSnap = await getDoc(userRef);
        data = docSnap.data();
    }

    const bookmarks = data.bookmarks[novel_uid][slug]
    // console.log(data.bookmarks[novel_uid][slug].length)
    if (bookmarks.length !== 0) {
      commit('setBookmarks', bookmarks)
      commit('setIsBookmark', true)
    }
  },
  // async addBookmarks({ rootState, state, commit},{novel_uid, slug}) {
  addBookmarks({ rootState, state, commit},) {
    const scrollAmount = rootState.common.scrollAmount;
    const bookmarks = [...state.bookmarks];

    if(!bookmarks.includes(scrollAmount)) {
      bookmarks.push(scrollAmount)
      if(bookmarks.length >= 2){
        bookmarks.sort((a, b) => b - a);
      }
    }
    commit('setBookmarks', bookmarks);
    // console.log(bookmarks)
  },
  // async addBookmark({ rootState, state, commit } ) {
  //   const uid = state.readingNovel.uid;
  //   const slug = state.readingNovel.slug;
  //   // ボタンを押したユーザーのuid
  //   const favoriteUid = rootState.user.uid;
    
  //   // slugの直下のドキュメントへの参照
  //   const novelRef = doc(db, 'novels', uid)
  //   // console.log(novelRef)
  
  //   const docSnap = await getDoc(novelRef);
  //   // console.log(docSnap)
  
  //   const data = docSnap.data();
  //   // console.log(data)

  //   //favorite項目がなければ配列として生成
  //   if (!data.novel[slug].favorites) {
  //     data.novel[slug].favorites = [];
  //   }

  //   //favUidがなければ配列に追加してupdate
  //   if (!data.novel[slug].favorites.includes(favoriteUid)) {
  //     data.novel[slug].favorites.push(favoriteUid);
  //     await updateDoc(novelRef, {
  //       [`novel.${slug}`]: data.novel[slug]
  //     });
  //     commit('setIsFavorite', true);
  //   }

  //   //favUidがあれば配列から削除してupdate
  //   else if (data.novel[slug].favorites.includes(favoriteUid)) {
  //     //uidが一致する配列の番号を取得
  //     const arrayNumber = data.novel[slug].favorites.indexOf(favoriteUid);
  //     // console.log(arrayNumber)
      
  //     // n番目の数値を配列から削除してその長さ分詰める
  //     data.novel[slug].favorites.splice(arrayNumber, 1);
  //     await updateDoc(novelRef, {
  //       [`novel.${slug}`]: data.novel[slug]
  //     });
  //     // console.log(data.novel[slug])
  //     commit('setIsFavorite', false);
  //   }
  // },
}
