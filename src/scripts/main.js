
'use strict'

if (window) {
  window._log = (initalizer, message) => {
    return console.log(`[castle/${initalizer}] - ${message}`)
  }
}

window._log('main.js', 'hello world!')