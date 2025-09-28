'use strict'

import hljs from '@npm/highlight.js'
import * as htmx from '@npm/htmx.org'

import { animate } from '@npm/animejs'

import './modules/color-scheme.js'
import './modules/lightbox-gallery.js'
import './modules/table-of-contents.js'
import './modules/hljs-switcher.js'

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

function animateHeader() {
  animate({
    targets: ['figure.image','h1.title.article__title'],
    translateY: '-100px', // Move the header up
    opacity: 0, // Fade out
    duration: 1000, // Animation duration in ms
    easing: 'easeInOutQuad', // Smooth easing
    complete: function () {
      console.log('Animation complete!')
    },
  })
}

// animateHeader()

window.htmx = htmx.default

window._log('index.js >> available', { htmx: htmx.default, animate, hljs })
