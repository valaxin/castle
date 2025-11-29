export default (async () => {

  'use strict'
  
  // get about title from client
  const tiles = document.querySelectorAll('.about .block .grid .cell')
  const summary_selector = '.about__grid-item-summary'

  // strictly for the tiles on the index page
  for (const tile of tiles) {

    // when user enters a tile element
    tile.addEventListener('mouseenter', enter_event => {
      
      // create tooltip HTMLElement
      const tooltip = document.createElement('div')
      let summary = enter_event.target.querySelectorAll(summary_selector)[0]

      // add to DOM
      tooltip.classList.add('tooltip')
      tooltip.innerText = summary.innerText
      enter_event.target.appendChild(tooltip)

      // get icons...
      const inner_imgs = enter_event.target.querySelectorAll('img')
      
      // see if icon has alt text
      for (const img of inner_imgs) {
        img.addEventListener('mouseenter', img_enter_event => {
          if (img.alt.length > 0) {
            tooltip.innerHTML = `<span class="tooltip__toolname tag is-small is-outlined is-info">${img.alt}</span></br> ${tooltip.innerHTML}`
          }
        })
        img.addEventListener('mouseleave', img_leave_event => {
          tooltip.innerText = summary.innerText
        })
      }

      // mouse leaves given tile...
      enter_event.target.addEventListener('mouseleave', leave_event => {
        tooltip.remove()
      })

      // mouse moves in given tile...
      enter_event.target.addEventListener('mousemove', move_event => {
        tooltip.style.postition = `absolute`
        tooltip.style.top = `${move_event.clientY}px`
        tooltip.style.left = `${move_event.clientX}px`
      })
    })
  }

  // for article headers...
  const article_header = ''
  const article_back_button = ''

  article_header.addEventListener('mouseenter', (enter_event) => {
    event_enter.target.addEventListener('mousemove', (move_event) => {})
    event_enter.target.addEventListener('mouseleave', (leave_event) => {})
  })

  article_back_button.addEventListener('mouseenter', (enter_event) => {
    event_enter.target.addEventListener('mousemove', (move_event) => {})
    event_enter.target.addEventListener('mouseleave', (leave_event) => {})
  })

  // turn off if mobile?

})()