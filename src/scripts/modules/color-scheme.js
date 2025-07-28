export default (async () => {

  'use strict'

  console.log(`[init] /modules/color-scheme.js`)

  const store = 'castle-color-scheme'
  const html = document.querySelector('html')
  const toggle = document.body.querySelector('.navbar-item > button.color-scheme-toggle')
  
  if (localStorage) {

    // attempt to get existing data...
    const local = localStorage.getItem(store)
    
    // set existing to theme...
    if (localStorage.getItem(store)) {
      html.dataset.theme = local
    }

    // when clicked...
    toggle.addEventListener('click', (e) => {
      switch (html.dataset.theme) {
        
        /* -- light > dark -- */
        case 'light':
          html.dataset.theme = 'dark'
          toggle.innerHTML = `<span class="material-icons round">nights_stay</span>`
          localStorage.setItem(store, html.dataset.theme)
          console.log('set item and changed dom [light > dark]')
          break
        
        /* -- dark > auto-- */
        case 'dark':
          html.dataset.theme = 'auto'
          toggle.innerHTML = `<span class="material-icons round">display_settings</span>`
          localStorage.setItem(store, html.dataset.theme)
          console.log('set item and changed dom [dark > auto]')
          break

        /* -- auto > light -- */
        case 'auto':
          html.dataset.theme = 'light'
          toggle.innerHTML = `<span class="material-icons round">light_mode</span>`
          localStorage.setItem(store, html.dataset.theme)
          console.log('set item and changed dom [auto > light]')
          break
      }
    })
  }

})()