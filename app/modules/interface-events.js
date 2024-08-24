export default (async function () {
  const navbarburger = document.querySelectorAll('.navbar-burger')[0]
  const navbarmenu = document.querySelectorAll('.navbar-menu')[0]

  navbarburger.addEventListener('click', (event) => {
    navbarmenu.classList.toggle('is-active')
    navbarburger.classList.toggle('is-active')
  })
  
})()

function hamburgerMenu (selector) {}