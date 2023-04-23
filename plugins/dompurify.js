import Vue from 'vue';
import DOMPurify from 'dompurify';

Vue.prototype.$sanitize = (html) => {
  const config = {
    ADD_TAGS: ['br'],
  };
  return DOMPurify.sanitize(html, config);
};