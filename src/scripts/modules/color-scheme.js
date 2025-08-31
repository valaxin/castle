export default (async () => {
  'use strict'

  if (!window || !document) return
  
  const storeKey = 'castle-theme'
  const toggleButton = document.body.querySelectorAll(`button.theme-toggle`)[0]
  const existing_theme = localStorage.getItem(storeKey)
  let system_theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  // get system level preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    system_theme = event.matches ? 'dark' : 'light'
    toggleButton.innerText = `AUTO (${system_theme.toUpperCase()})`
  })
  
  // set saved level preference into dom, if not present, create and save.
  if (localStorage) {
    if (!existing_theme) {
      localStorage.setItem(storeKey, document.documentElement.dataset.theme)
    }
    if (existing_theme === 'auto') {
      toggleButton.innerText = `${existing_theme.toUpperCase()} (${system_theme.toUpperCase()})`
    } else {
      toggleButton.innerText = existing_theme.toUpperCase()
    }
    
    document.documentElement.setAttribute('data-theme', existing_theme)
  }

  // save to local
  function save(key, data) {
    try {
      return localStorage.setItem(key, data)
    } catch (err) {
      return err
    }
  }

  // change theme
  async function change() {
    switch (document.documentElement.dataset.theme) {
      case 'auto':
        toggleButton.innerText = 'LIGHT'
        save(storeKey, 'light')
        return document.documentElement.setAttribute('data-theme', 'light')
      case 'light':
        toggleButton.innerText = 'DARK'
        save(storeKey, 'dark')
        return document.documentElement.setAttribute('data-theme', 'dark')
      default:
        toggleButton.innerText = `AUTO (${system_theme.toUpperCase()})`
        save(storeKey, 'auto')
        return document.documentElement.setAttribute('data-theme', 'auto')
    }
    console.log(document.documentElement.dataset.theme)
  }

  // change hljs
  async function changeHLJS () {
    console.log('changing hljs theme to match')
  }

  // click event
  toggleButton.addEventListener('click', async () => {
    await change()
    await changeHLJS()
  })
})()
