'use strict'

// adds bulma style classes to custom containers within a given blog post
const customArticleContainers = (articleSelector) => {
  try {
    let elements = ''
    const elementTypes = ['spoilers', 'warning', 'information']
    const articleBody = document.body.querySelectorAll(articleSelector)[0]
    if (!articleBody) {
      console.log('no article')
      return false
    }
    for (const type of elementTypes) {
      elements = articleBody.querySelectorAll(`.${type}`)
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

// add highlighting classes to current page anchor within <nav> element
const navHighlighting = (navigationSelector) => {
  let navigationLinks = document.body.querySelectorAll(navigationSelector)
  // console.log(window.location.pathname, navigationLinks)
  for (link of navigationsLinks) {
    // console.log(link)
  }
}

// self calling anonymous call
// add bulma classes when viewport reaches a defined width size
export default (async function () {
  let pathSlug = 'blog'
  if (window.location.pathname.includes(`/${pathSlug}`)) {
    const containers = articleContainers('section.content > article.content')
    if (containers) {
      console.log('custom-containers:', containers)
    }
  }
  const links = navHighlighting('nav.navbar > div a')
  if (links) {
    console.log('navigation-links', links)
  }
})()
