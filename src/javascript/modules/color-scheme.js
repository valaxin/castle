// what? find the button?

// it should be something like?

export default (async () => {

  const scheme = document.querySelector('html')
  const button = document.querySelector('nav.navbar button[data-colorpref]')
  const faicon = button.querySelector('i.fa')

  
  const modifyClass = (e, icon) => {
    console.log(e, icon)
  }
  
  if (localStorage) {

    // check in local storage if there set into dom before eval
    const theme = localStorage.getItem('castle-theme')
    if (localStorage.getItem('castle-theme')) {
      scheme.dataset.theme = theme
    }
    
    // add event to button and eval on click
    button.addEventListener('click', (e) => {
      switch (scheme.dataset.theme) {
        case 'light':
          scheme.dataset.theme = 'dark'
          localStorage.setItem('castle-theme', 'dark')
          break
        case 'dark':
          scheme.dataset.theme = 'auto'
          localStorage.setItem('castle-theme', 'auto')
          break
        case 'auto':
          scheme.dataset.theme = 'light'
          modifyClass('dsds', 'sun')
          localStorage.setItem('castle-theme', 'light')
      }
    })
  }
})()
