'use strict'

import * as htmx from '@npm/htmx.org'
import { animate } from '@npm/animejs'

if (window) {
  window._log = (initalizer, message) => {
    return console.log(`[castle/${initalizer}]`, message)
  }
} else {
  console.error('no window object, this code is intended for the browser')
}

// ...

window.htmx = htmx.default
window._log('index.js', {htmx: htmx.default, animate, })

// ...
/*
animate(['.navbar-brand', '.navbar-item'], {
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  loop: false,
  delay: 250
});
*/