export default (async () => {
  
  'use strict'
  
  console.log(`[todo] /modules/lightbox-gallery.js`)

  const imgs = document.body.querySelectorAll('img.lightbox-enabled')

  for (const image of imgs) {
    image.addEventListener('click', e => {
      const lightboxInner = `
        <span class="lightbox__close material-icons round close is-white">close</span>
        <img style="cursor: zoom-out;" class="lightbox__image" src=${e.target.src}>
        <span class="lightbox__image-alt-text">${e.target.alt}</span>
      `.trim()
      
      const lightbox = document.createElement('div')
      lightbox.classList.add('lightbox')
      lightbox.innerHTML = lightboxInner
      
      const close = lightbox.querySelector('.lightbox__close')

      close.addEventListener('click', e => { lightbox.remove() })
      lightbox.addEventListener('click', e => { lightbox.remove() })

      const preexisting = document.querySelector('div.lightbox')
      if (preexisting != null) { preexisting.remove() }
      document.body.appendChild(lightbox)
    })

  }

})()
