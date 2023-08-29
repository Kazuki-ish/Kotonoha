export default function (context) {
  const { store, route, from, redirect } = context
  store.commit('common/setIsMounted', false)
  //isMountedをfalseに初期化

  // ページ遷移時にメッセージをクリアする処理
//   store.dispatch('common/clearMessage')
}
