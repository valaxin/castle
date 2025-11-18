export default (async () => {

  'use strict'
  
  const tiles = document.querySelectorAll('.about .block .grid .cell')

  for (const tile of tiles) {
    // console.log(tile)
    tile.addEventListener('mouseenter', e => {
      
      // mouse enter create element
      const floater = document.createElement('div')
      let t = e.target.querySelectorAll('.about__grid-item-summary')[0]
      e.target.appendChild(floater)
      floater.classList.add('floater')

      console.log(t)
      
      floater.innerText = t.innerText

      // mouse leaves...
      e.target.addEventListener('mouseleave', ex => {
        floater.remove()
      })

      // mouse move, move element
      tile.addEventListener('mousemove', ev => {
        // console.log('enter event!')
        // console.log('Mouse X:', ev.clientX, 'Mouse Y:', ev.clientY)

        // now me make a new element and have it follow the cursor
        // it need not interact with the window (create overflow)
        // if more than 33% is out of view port flip side?
        // feature disabled on mobile...

        floater.style.postition = `absolute`
        floater.style.top = `${ev.clientY}px`
        floater.style.left = `${ev.clientX}px`
        

        // 


      })
    })
  }



})()