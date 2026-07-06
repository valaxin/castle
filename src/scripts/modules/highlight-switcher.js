export default (async () => {
  let userTheme = document.documentElement.dataset.theme
  const themeLink = document.getElementById('hljs-theme')
  const gh_dark = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
  const gh_light = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'

  function setThemeSystem(e) {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (dark) {
      if (userTheme === 'light') {
        themeLink.href = gh_light
      } else if (userTheme === 'dark') {
        themeLink.href = gh_dark
      } else if (userTheme === 'auto') {
        themeLink.href = gh_dark
      }
    } else {
      if (userTheme === 'light') {
        themeLink.href = gh_light
      } else if (userTheme === 'dark') {
        themeLink.href = gh_dark
      } else if (userTheme === 'auto') {
        themeLink.href = gh_light
      }
    }
  }

  // init
  setThemeSystem()

  const config = {
    attributes: true,                 // Listen to attribute changes
    attributeFilter: ['data-theme']   // Only watch specific data 
  }

  // observe user state ...
  const observerCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      console.log(mutation)
      userTheme = document.documentElement.dataset.theme
      setThemeSystem()
    }
  }

  // define observer, make do with above cfg
  const observer = new MutationObserver(observerCallback);
  observer.observe(window.document.documentElement, config)
  // observer.disconnect() ...
  
  // when sys change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeSystem)
})()
