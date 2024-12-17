import '@global/core-js/stable'
import '@styles/layout.scss'
import '@local/class-injections.js'     // self-calling (only needed on article pages)
import '@local/interface-events.js'     // self-calling (global)
import '@local/scroll-interactions.js'  // self-calling (global)

import tocbot from '@global/tocbot'
import tocopt from '@local/table-of-content.js'

(async () => {
    
  if (window.location.pathname.includes('/blog/')) {
    // enable tocbot, and set header depth
    tocbot.init(tocopt('section.content > article.content', 'h1, h2, h3, h4'))
  }
  
})()
