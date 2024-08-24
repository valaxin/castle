import '@global/core-js/stable'
import '@global/bulma'
import '@global/highlight.js/scss/github-dark.scss'
import '@styles/layout.scss'

import '@local/class-injections.js'     // self-calling (only needed on article pages)
import '@local/interface-events.js'     // self-calling (global)
import '@local/scroll-interactions.js'  // self-calling (global)

import tocOptions from '@local/table-of-content.js'

(async () => {
  
  tocbot.init(tocOptions('section.content article.content', 'h1, h2, h3, h4'))

  console.log('setup and running...')

})()
