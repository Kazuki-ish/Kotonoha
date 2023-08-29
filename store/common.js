export const state = () => ({
    isOpenMenu: false,
    pageName: '',
    auther: '',
    hasMessage: false,
    messageText: '',
    isMounted: false,
    scrollAmount : '',
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
    setScrollAmount(state, string) {
      state.scrollAmount = string
    }
  }

  export const actions = {
    setMessage({commit}, message){
      const time = 2500;

      commit('setMessage', {hasMessage: true, messageText: message});
      setTimeout(() => {
        commit('setMessage', { hasMessage: false, messageText: message });
      }, time);
      setTimeout(() => {
        commit('setMessage', {messageText:''})
      }, time + 2000)
    },
    clearMessage({commit}) {
      commit('setMessage', {hasMessage: false, messageText: ''});
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