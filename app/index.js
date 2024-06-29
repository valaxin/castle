import '@global/core-js/stable'

import '@global/bulma'
import '@global/highlight.js/scss/github-dark.scss'
import '@styles/layout.scss'

import '@local/class-injections.js'
import '@local/interface-events.js'
import '@local/scroll-interactions.js'
import tocOptions from '@local/table-of-content.js'

;(async () => {
  const tocopt = tocOptions('section.post article.content', 'h1, h2, h3, h4')
  tocbot.init(tocopt)
})()
