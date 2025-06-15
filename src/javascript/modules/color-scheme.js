export default (async () => {
  const scheme = document.querySelector('html')
  const button = document.querySelector('nav.navbar button[data-colorpref]')
  const innerIcon = button.querySelector('i.fa')

  const switchIconTo = (newIcon) => {
    let lastClass = innerIcon.classList[innerIcon.classList.length - 1]
    innerIcon.classList.replace(lastClass, `fa-${newIcon}`)
  }
  
  if (localStorage) {
    const theme = localStorage.getItem('castle-theme')
    if (localStorage.getItem('castle-theme')) {
      scheme.dataset.theme = theme
    }
    
    button.addEventListener('click', (e) => {
      switch (scheme.dataset.theme) {

        case 'light':
          scheme.dataset.theme = 'dark'
          switchIconTo('moon')
          localStorage.setItem('castle-theme', scheme.dataset.theme)
          break
  
        case 'dark':
          scheme.dataset.theme = 'auto'
          switchIconTo('desktop')
          localStorage.setItem('castle-theme', scheme.dataset.theme)
          break

        case 'auto':
          scheme.dataset.theme = 'light'
          switchIconTo('sun')
          localStorage.setItem('castle-theme', scheme.dataset.theme)
      }
    })
  }
})()
