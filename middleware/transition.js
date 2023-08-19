export default function (context) {
    const { store, route, from, redirect } = context;
    store.commit('common/setIsMounted', false); 
    //isMountedをfalseに初期化
}