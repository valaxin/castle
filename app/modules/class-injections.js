'use strict'

// adds 'bulma' classes to custom containers within a given blog post

function articleContainers(articleSelector) {

  try {
    let elements = ''
    const elementTypes = ['spoilers', 'warning', 'information']
    const articleBody = document.body.querySelectorAll(articleSelector)[0]
    for (const type of elementTypes) {
      elements = articleBody.querySelectorAll(`.${type}`)
      console.log(elements)
      for (const el of elements) {
        const header = `<div class="message-header"><p>${type}</p></div>`
        el.children[0].classList.add('message-body')
        el.classList.add('message', `is-${type}`)
        el.innerHTML = header + el.innerHTML
      }
    }
    return elements
  } catch (ex) {
    return ex
  }
}

// add bulma classes when viewport reaches a defined width size

export default (async function () {
  if (window.location.pathname.includes('/blog/')) {
    const containers = articleContainers('section.content > article.content')
    if (containers) {
      console.log('custom-containers:', containers)
    }
  }
})()
