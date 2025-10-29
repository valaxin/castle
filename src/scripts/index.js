'use strict'

import hljs from '@npm/highlight.js'
import * as htmx from '@npm/htmx.org'
import { animate, createTimeline, stagger, utils, text, onScroll } from '@npm/animejs'

import './components/color-scheme.js'
import './components/lightbox-gallery.js'
import './components/table-of-contents.js'
import './components/hljs-switcher.js'

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

const articleTitle = text.splitText(['.article__title'], { words: { wrap: 'clip' }, chars: true })

const [ $value ] = utils.$('.value');

animate(
  [
    heroContentTitle.words,
    heroContentTitle.chars,
    heroContentSubtitle.words,
    siteSuptitle.words,
    siteSuptitle.chars,
    siteSubtitle.words,
    siteTitle.words,
    '.hero__container-action',
    articleTitle.words,
    articleTitle.chars,
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
      enter: 'bottom+=50 top',
      leave: 'top+=50 bottom',
      sync: true,
      debug: true,
    }),
    */
  }
)
