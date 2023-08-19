export const state = () => ({
    isOpenMenu: false,
    pageName: '',
    auther: '',
    hasMessage: false,
    messageText: '',
    isMounted: false,
  })
  
  export const mutations = {
    toggle (state) {
      state.isOpenMenu = !state.isOpenMenu
      //console.log(state.isOpenMenu)
    },
    close (state) {
      state.isOpenMenu = false
      //console.log(state.isOpenMenu)
    },
    inputPageName(state, input) {
      state.pageName = input;
    },
    inputAuther(state, input) {
      state.auther = input;
      // console.log(state.auther)
    },
    setMessage(state, {hasMessage, messageText}) {
      state.hasMessage = hasMessage;
      state.messageText = messageText;
    },
    toggleMount(state) {
      state.isMounted = !state.isMounted;
    },
    setIsMounted(state, boolarn) {
      state.isMounted = boolarn;
    },
  }

  export const actions = {
    setMessage({commit}, message){
      commit('setMessage', {hasMessage: true, messageText: message});
      setTimeout(() => {
        commit('setMessage', {hasMessage: false, messageText: ''});
      }, 2000);
    },
    clearMessage({commit}) {
      commit('setMessage', {hasMessage: false, messageText: ''});
    },
  }