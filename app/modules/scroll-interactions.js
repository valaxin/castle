export default (async function () {
  
  const postBody = document.querySelectorAll('article.content')[0]
  const postHero = document.querySelectorAll('section.hero')[0]
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
      window.scrollTo(0, 0)
    }
  }

  if (postBody) {
    window.onscroll = (event) => {
      let position = ScrollPosition()
      let sticky = position.scroll - postHero.clientHeight
      let finished = Math.abs(postHero.clientHeight + postBody.clientHeight - tableof.clientHeight)

      if (
        // while user is past the hero element but within with post content body.
        position.scroll >= postHero.clientHeight &&
        position.scroll <= postBody.clientHeight + postHero.clientHeight
      ) {
        if (sticky >= 0) {
          tableof.style.top = sticky + 'px'
        }
      } else {
        tableof.style.top = 'auto'
        tableof.style.height = 'auto'
      }

      if (position.scroll >= document.body.offsetHeight / 3) {
        ScrollToTopButton('show')
      } else {
        ScrollToTopButton('hide')
      }
    }
  }
})()
