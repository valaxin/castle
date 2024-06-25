export default (async function () {
  const navbarburger = document.querySelectorAll(".navbar-burger")[0];
  const navbarmenu = document.querySelectorAll(".navbar-menu")[0];

  navbarburger.addEventListener("click", (event) => {
    navbarmenu.classList.toggle("is-active");
    navbarburger.classList.toggle("is-active");
  });

  let cachedscrollvalue = 0
  
  document.addEventListener('scroll', (event) => {

    if (window.scrollY > cachedscrollvalue) {
      console.log('going down the page')
      // slide down
      navbarmenu.parentElement.classList.add('away')
    } else {
      console.log('going up the page')
      // slide up (hide)
      navbarmenu.parentElement.classList.remove('away')
    }

    cachedscrollvalue = window.scrollY

  })

})();