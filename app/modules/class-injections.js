'use strict'

function articleContainers(articleSelector) {
  try {
    let elements
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

export default (async function () {
  const containers = articleContainers('section.post > article.content')

  console.log({ containers })
})()
