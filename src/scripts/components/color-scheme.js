
/**
 * PURPOSE - HANDLE DARK AND LIGHT MODE
 */

export default (async () => {
  
  'use strict'

  // if no window no go go
  if (!window || !document) { return }

  // [helper method] save to local stoage or return an error
  function save (key, data) {
    try {
      if (localStorage) {
        return localStorage.setItem(key, data)
      }
    } catch (err) {
      return err
    }
  }

  // [helper-method] change element classes
  function change (key, button, light, dark, auto) {
    switch (document.documentElement.dataset.theme) {
      case 'auto': // auto -> light
        button.innerHTML = light
        save(key, 'light')
        return document.documentElement.setAttribute('data-theme', 'light')
      case 'light':  // light -> dark
        button.innerHTML = dark
        save(key, 'dark')
        return document.documentElement.setAttribute('data-theme', 'dark')
      default: // dark -> auto
        button.innerHTML = auto
        save(key, 'auto')
        return document.documentElement.setAttribute('data-theme', 'auto')
    }
  }

  // known values
  const storeKey = 'castle-theme'
  const toggleSelector = 'button.theme-toggle'
  const toggleButton = document.body.querySelectorAll(toggleSelector)[0]
  const existing_theme = localStorage.getItem(storeKey)

  // icons
  let dark_icon = `<span class="material-icons round">dark_mode</span>`
  let light_icon = `<span class="material-icons round">light_mode</span>`
  let auto_icon = `<span class="material-icons round">auto_awesome</span>`

  let system_theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  console.log({ storeKey, toggleButton, toggleSelector, existing_theme, el: { auto_icon, dark_icon, light_icon }})

  // attach event to theme change event
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    system_theme = event.matches ? 'dark' : 'light'
    console.log(system_theme, 'changed!')
  })
  
  // set saved level preference into dom, if not present, create and save.
  if (localStorage) {
    switch (!existing_theme) {
      case existing_theme == 'auto':
        document.documentElement.setAttribute('data-theme', 'auto')
        console.log('auto')
      case existing_theme == 'light':
        document.documentElement.setAttribute('data-theme', 'light')
        console.log('light')
      case existing_theme == 'dark':
        document.documentElement.setAttribute('data-theme', 'dark')
        console.log('dark')
      default:
    }
  }
  // make btn
  toggleButton.addEventListener('click', async () => { change(storeKey, toggleButton, light_icon, dark_icon, auto_icon) })

})()
