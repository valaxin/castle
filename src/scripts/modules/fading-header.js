export default (async () => {
  try {



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

  if (!article) {
    console.log('no header element, exiting...')
    return false
  }

  const image = article.querySelectorAll('.article__hero')[0]
  const title = article.querySelectorAll('.article__title')[0]

  // watch for scroll user event
  window.addEventListener('scroll', async (ev) => {
    if (window.scrollY > image.clientHeight) {
      image.style.marginTop = 'auto'
    } else {
      image.style.opacity = getOpacity(image, window.scrollY)
    }
  })

} catch (error) {
  console.error('fading-header.js failed', error)
}
})()
