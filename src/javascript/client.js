import toc_options from './modules/table-of-contents.js';

export default {
  blog: {
    toc: function (selector, elements, options) {
      if (tocbot) {
        if (window.location.pathname.includes(options.pathname)) {
          // object exists in global namespace, and user's path is valid...
          tocbot.init(toc_options(selector, elements))    
          return tocbot
        }
      }
    },
  }
}
