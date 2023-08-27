export default ({store, route}, inject) => {
    inject('scrollSet', (refs) => {
      const content = refs ? refs : document.getElementById('js-c-scroll');
      const scrollWidth = content.scrollWidth;
  
      // scrollLeftを0(右端)にする
      content.scrollLeft = scrollWidth;

      // console.log(content.scrollLeft)
      // content.classList.add('-mounted');
      setTimeout(() => {
        store.commit('common/setIsMounted', true);
      }, 200
      )
    });
  };
  