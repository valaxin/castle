import '@css/layout.scss'
import client from '@web/client.js'

(async () => { 
  
  'use strict'

  client.blog.toc('section.content', 'h1, h2, h3', { pathname: '/blog/' })
  console.log('[client.js] - Running...')

})()