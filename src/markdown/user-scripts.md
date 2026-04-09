## why?

Basically we're looking to achieve functionality on a given website with the data provided to the client that otherwise isn't present as the website is shipped.

## How?

- Pick a browser, doesn't really matter currently (chrome engine or otherwise is most ubiquitous) pick.
- Either way install `TamperMonkey` personally this is my go to script runner extension.
- Open your favourite text editor and create.

```javascript
// header.js
// ==UserScript==
// @name         user-script
// @namespace    no.domain
// @version      0.0.0
// @description  -
// @author       -
// @run-at       document-idle
// @match        *://*.*/*
// @icon         -
// @require      file:///path/to/local/script.js
// @grant        none
// ==/UserScript==

(async () => { console.log('loaded...') })()
```

Great now, you'll notice `@require file:///path/to/local/script.js` this is user script land's include declaration. this allows us to work and save a file and not have to bring the file into the extension on each change.

```javascript
// script.js
console.log({ window, document })
const element = document.querySelector('.selector')
element.addEventListener('click', event => alert('clicked!'))
```

And there you have it. simple right. Assuming you just copied and pasted the above it should do nothing, it's pseudo-code and intended to convey and idea, -who would intentionally give an element the selector ".selector". Obviously you can take this and accomplish quite a bit of information gathering, trend seeking etc use. Do your own research to understand and a good way to do this is by reading user-scripts made by others and allowing their design influence how you come to create.

```javascript
function getElementsWithContent (selector) {
 document.querySelectorAll(selector).filter(element => {
  if (element.innerHTML.length > 0) {
   return element
  }
 }
}
```

even just updating the cursor

```javascript
document.style.cursor = `url('file:///path/to/cursor.cur')`
```

every five seconds

```javascript
setInterval(() => {
 document.style.cursor = `url('file:///path/to/cursor.cur')`
}, 5000)
```

## When?

Sites have data visible to the user and sometimes the curious want to collect and transform in meaningful ways and unfortunately it source remains locked, so assuming you can navigate the dom you can sift out the gold and learn a thing or two along the way.
