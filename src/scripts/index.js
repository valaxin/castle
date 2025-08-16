'use strict'

import hljs from '@npm/highlight.js';
// import '@npm/highlight.js/styles/github-dark.css' 
import '@npm/highlight.js/styles/github.css'
import * as htmx from '@npm/htmx.org'

import { animate } from '@npm/animejs'

import './modules/color-scheme.js'
import './modules/lightbox-gallery.js'
import './modules/table-of-contents.js'

const theme = window.matchMedia(`(prefers-color-scheme: dark)`)
const themePref = document.documentElement.dataset.theme


if (theme.matches && themePref != 'dark') {
  themePref = theme
}

console.log({ theme, themePref })

if (window) {
  window._log = (initalizer, message) => {
    return console.log(`[castle/${initalizer}]`, message)
  }
} else {
  console.error('no window object, this code is intended for the browser')
}

window.htmx = htmx.default
window._log('index.js >> available', { htmx: htmx.default, animate, hljs })