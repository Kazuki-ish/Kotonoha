export default ({store, route}, inject) => {
    inject('scrollSet', (refs) => {
      const content = refs ? refs : document.getElementById('js-c-scroll');
      const scrollWidth = content.scrollWidth;
  
      content.scrollLeft = scrollWidth;
      // content.classList.add('-mounted');
      setTimeout(() => {
        store.commit('common/toggleMount');
      }, 200
      )
    });
  };
  