export default (async () => {
  'use strict'

  console.log(`[init] /modules/color-scheme.js`)

  const toggle = { selector: '.navbar-item > button.color-scheme-toggle' }
  const local = { name: 'castle-theme' }
  const html = document.querySelector('html')
  toggle.button = document.body.querySelector(toggle.selector)

  function theme (key) {
    if (localStorage) {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        return error
      }
    }
  }

  const current = theme(local.name)

  console.log({ toggle, current })

})()
