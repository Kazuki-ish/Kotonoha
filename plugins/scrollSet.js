export default ({store, route}, inject) => {
    inject('scrollSet', (refs) => {
      const content = refs ? refs : document.getElementById('js-c-scroll');
      let scrollWidth = content.scrollWidth;
  
      if (store.state.common.readyBmIndex !== '') {
        scrollWidth = store.state.common.readyBmIndex;
      }
      // scrollLeftを0(右端)にする
      if (content) {
        content.scrollLeft = scrollWidth;
      }

      // console.log(content.scrollLeft)
      // content.classList.add('-mounted');
        store.dispatch('common/changeIsMounted', true); 
    });
  };
  