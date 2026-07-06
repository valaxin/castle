import { remove } from 'animejs'

export default (async () => {
  'use strict'

  function getOpacity(el, scrollY) {
    const viewportTop = scrollY
    const viewportBottom = scrollY + window.innerHeight
    const elementTop = el.offsetTop
    const elementBottom = elementTop + el.offsetHeight
    const visibleTop = Math.max(viewportTop, elementTop)
    const visibleBottom = Math.min(viewportBottom, elementBottom)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    return (visibleHeight / el.offsetHeight).toFixed(2)
  }

  // is article ?
  const article = document.querySelector('article')
  const image = article.querySelectorAll('.article__hero')[0]
  const title = article.querySelectorAll('.article__title')[0]

  // watch for scroll user event
  window.addEventListener('scroll', async (ev) => {
   
    if (window.scrollY > image.clientHeight) {
      console.log(`hero image is no longer visible`)
      image.style.marginTop = 'auto'
    } else {
      // fade here
      image.style.opacity = getOpacity(image, window.scrollY)
      // image.style.marginTop = (image.style.marginTop += window.scrollY) + 'px'
      
    }

  })

})()
