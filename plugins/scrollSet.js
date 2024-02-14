export default ({store, route}, inject) => {
    inject('scrollSet', (refs) => {
      const content = refs ? refs : document.getElementById('js-c-scroll');
      let targetScrollWidth = content.scrollWidth;
  
      if (store.state.common.readyBmIndex !== '') {
        targetScrollWidth = store.state.common.readyBmIndex;
      }
      // scrollLeftを0(右端)にする
      if (content) {
        smoothScrollTo(content, targetScrollWidth);
      }

      // console.log(content.scrollLeft)
      // content.classList.add('-mounted');
        store.dispatch('common/changeIsMounted', true); 
    });
  };

  function smoothScrollTo(element, target, duration = 200) {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();
  
    function animateScroll(time) {
      const elapsedTime = time - startTime;
      const fraction = elapsedTime / duration;
  
      if (fraction < 1) {
        const newScrollPosition = start + change * easeInOutQuad(fraction);
        element.scrollLeft = newScrollPosition;
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollLeft = target;
      }
    }
  
    requestAnimationFrame(animateScroll);
  }
  
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  