export default (async function () {
  const postBody = document.querySelectorAll('article.content')[0]
  const postHero = document.querySelectorAll('section.hero')[0]
  const tocWrapper = document.querySelectorAll('div.toc-wrapper')[0]
  const tableof = document.querySelectorAll('div.toc')[0]

  const ScrollPosition = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    return { scroll, height }
  }

  const ProgressBarElement = (classes) => {
    const container = document.createElement('div')
    container.classList.add(classes)
    container.appendChild(document.createElement('div'))
    return container
  }

  const ScrollToTopButton = (action) => {
    const container = document.body.querySelectorAll('.scroll-up-button')[0]
    if (action === 'show') {
      container.classList.remove('is-hidden')
    }
    if (action === 'hide') {
      container.classList.add('is-hidden')
    }
    container.onclick = (e) => {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (postBody) {

    window.onscroll = (event) => {
      let position = ScrollPosition()
      
      if (position.scroll >= postHero.clientHeight) {
        tableof.classList.add('sticky')
        if (position.scroll >= postBody.clientHeight) {
          tableof.classList.add('stuck')
        } else {
          tableof.classList.remove('stuck')
        }
      } else {
        tableof.classList.remove('sticky')
      }

      if (position.scroll >= document.body.offsetHeight / 4) {
        ScrollToTopButton('show')
      } else {
        ScrollToTopButton('hide')
      }
    }
  }
})()
