'use strict';

export default (async function () {
  
  const blockTypes = ["spoilers", "warning", "information"];
  const bodySelector = "section.post > article.content";
  const postBody = document.querySelectorAll(bodySelector)[0];
  
  for (const type of blockTypes) {
    const found = postBody.querySelectorAll(`.${type}`);
    for (const elem of found) {
      const header = `<div class="message-header"><p>${type}</p></div>`;
      elem.children[0].classList.add("message-body");
      elem.classList.add("message", `is-${type}`);
      elem.innerHTML = header + elem.innerHTML;
    }
  }
})();