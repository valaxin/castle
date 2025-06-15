import '@css/layout.scss'
import client from '@web/client.js'

import '@npm/bulma'
import '@npm/tocbot'
import '@npm/tocbot/dist/tocbot.css'
import '@npm/fontawesome-free/css/all.css'
import '@npm/highlight.js'
import '@npm/highlight.js/styles/github.css'

(async () => { 
  'use strict'  
  client.blog.toc('.post-content', 'h1, h2, h3', { pathname: '/blog/' })
  console.log('[client.js] - Running...')
})()