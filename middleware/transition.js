export default async function (context) {
    const { store, route, from, redirect } = context;
    store.commit('common/setIsMounted'); 
    //isMountedをfalseに初期化
}