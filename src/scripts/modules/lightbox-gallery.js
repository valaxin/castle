export default (async () => {
  'use strict'

  /**
   * export an anonymous self calling function that
   * looks throughout the DOM for image elements with
   * the class `.lightbox-enabled`, each found is given
   * a click event that creates a new element to present
   * the clicked image in a new front most layer of the document.
   */

  const imgs = document.body.querySelectorAll('img.lightbox-enabled')
  for (const image of imgs) {
    image.addEventListener('click', (e) => {
      // define the contents of the lightbox element
      const lightboxInner = `
        <span class="lightbox__close material-icons round close is-white">close</span>
        <img style="cursor: zoom-out;" class="lightbox__image" src=${e.target.src}>
        <span class="lightbox__image-alt-text">${e.target.alt}</span>
      `.trim()
      // create a lightbox element, adding classes
      const lightbox = document.createElement('div')
      lightbox.classList.add('lightbox')
      lightbox.innerHTML = lightboxInner
      // close button
      const close = lightbox.querySelector('.lightbox__close')
      close.addEventListener('click', (e) => {
        lightbox.remove()
      })
      // clicking NOT the image
      lightbox.addEventListener('click', (e) => {
        lightbox.remove()
      })
      // remove...
      const preexisting = document.querySelector('div.lightbox')
      if (preexisting != null) {
        preexisting.remove()
      }
      document.body.appendChild(lightbox)
    })
  }
})()
