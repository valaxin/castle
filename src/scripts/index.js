'use strict'

import hljs from '@npm/highlight.js'
import * as htmx from '@npm/htmx.org'
import { animate, createTimeline, stagger, utils, text, onScroll } from '@npm/animejs'

import './components/color-scheme.js'
import './components/lightbox-gallery.js'
import './components/table-of-contents.js'
import './components/hljs-switcher.js'
import './components/cursor-tooltip.js'

let theme = window.matchMedia(`(prefers-color-scheme: dark)`)
let themePref = document.documentElement.dataset.theme

if (theme.matches && themePref != 'dark') {
  themePref = theme
}

if (window) {
  window._log = (initalizer, message) => {
    return console.log(`[castle/${initalizer}]`, message)
  }
} else {
  console.error('no window object, this code is intended for the browser')
}

window.htmx = htmx.default
window._log('index.js >> available', { htmx: htmx.default, animate, hljs })

// animations
const siteTitle = text.splitText(['.hero__title'], { words: { wrap: 'clip' } })
const siteSuptitle = text.splitText(['.hero__suptitle'], { words: { wrap: 'clip', chars: true } })
const siteSubtitle = text.splitText(['.hero__subtitle'], { words: { wrap: 'clip', chars: true } })
const heroContentTitle = text.splitText(['.hero__content-title'], { words: { wrap: 'clip' }, chars: true })
const heroContentSubtitle = text.splitText(['.hero__content-subtitle'], { words: { wrap: 'clip' } })

const [$value] = utils.$('.value')

const heroAnimation = animate(
  [
    heroContentTitle.words,
    heroContentTitle.chars,
    heroContentSubtitle.words,
    siteSuptitle.words,
    siteSuptitle.chars,
    siteSubtitle.words,
    siteTitle.words,
    '.hero__container-action',
    // articleTitle.words,
    // articleTitle.chars,
  ],
  {
    y: ['75%', '0%'],
    duration: 800,
    ease: 'out(3)',
    delay: stagger(50),
    opacity: [0, 1],
    loop: false,
    alternate: true,
    /*
    autoplay: onScroll({
      container: '.scroll-container',
      enter: 'bottom top-=100',
      leave: 'top bottom+=150',
      sync: true,
      debug: true,
    }),
    */
  }
)

const articleTitle = text.splitText(['.article__title'], { words: { wrap: 'clip' }, chars: true })
const articleContent = text.splitText(['.article__content'], { words: { wrap: 'clip' }, chars: true })
const genericScrollReveal = animate({})

document.addEventListener('DOMContentLoaded', () => {
  const nodes = [...document.body.querySelectorAll('body > *')]

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting && e.target.dataset.revealed !== 'true')
        .map((e) => e.target)

      if (visible.length === 0) return

      visible.forEach((node, index) => {
        node.animate(
          [
            { opacity: 0, transform: 'translateY(24px) scale(0.995)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          {
            duration: 700,
            easing: 'cubic-bezier(.2,.8,.2,1)',
            delay: index * 20,
            fill: 'forwards',
          }
        )

        node.dataset.revealed = 'true'
        io.unobserve(node)
      })
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15,
    }
  )

  nodes.forEach((node) => io.observe(node))
})

// ...

const article_header_image = document.querySelectorAll('figure.image > img.article__hero')

console.log(article_header_image)
