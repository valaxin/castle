'use strict'

import hljs from '@npm/highlight.js'
import * as htmx from '@npm/htmx.org'
import { animate } from '@npm/animejs'

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

animate('.hero__animated-child', {
  x: () => utils.random(0, 17) + 'rem',
  y: () => utils.random(-1, 1) + 'rem',
  rotate: () => utils.random(-360, 360, 1),
  scale: () => utils.random(.1, 1.5, 2),
  duration: 750,
  loop: true,
})