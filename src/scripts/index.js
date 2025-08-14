'use strict'

import hljs from '@npm/highlight.js';
import '@npm/highlight.js/styles/github-dark.css' // You can choose any style you prefer
import '@npm/highlight.js/styles/github.css' // You can choose any style you prefer
import * as htmx from '@npm/htmx.org'

import { animate } from '@npm/animejs'

import './modules/color-scheme.js'
import './modules/table-of-contents.js'

if (window) {
  window._log = (initalizer, message) => {
    return console.log(`[castle/${initalizer}]`, message)
  }
} else {
  console.error('no window object, this code is intended for the browser')
}

window.htmx = htmx.default
window._log('index.js >> available', { htmx: htmx.default, animate, hljs })