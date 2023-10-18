export const state = () => ({
    isOpenMenu: false,
    pageName: '',
    auther: '',
    hasMessage: false,
    messageText: '',
    isMounted: false,
    scrollAmount : '',
    isReading: false,
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

      if (messageText) {
        state.messageText = messageText;
      }
    },
    clearMessage(state) {
      if (state.hasMessage == true) {
        state.hasMessage = false;
      }
      state.messageText = '';
    },
    toggleMount(state) {
      state.isMounted = !state.isMounted;
    },
    setIsMounted(state, boolarn) {
      state.isMounted = boolarn;
    },
    setScrollAmount(state, horizontal) {
      state.scrollAmount = horizontal
    },
    setIsReading(state, boolarn) {
      state.isReading = boolarn
    },
  }

  export const actions = {
    setMessage({commit}, message){
      const time = 3500;

      commit('setMessage', {hasMessage: true, messageText: message});
      setTimeout(() => {
        commit('setMessage', { hasMessage: false });
      }, time);
    },
    changeIsMounted({commit}, boolarn) {
      if(boolarn == true) {
        setTimeout(() => {
          commit('setIsMounted', boolarn);
        }, 100);
      }
      else {
        commit('setIsMounted', boolarn);
      }
    },
  }