export default function tocOptions(contentSel, headingSel) {
  try {
    headingSel = headingSel ? "h1, h2, h3" : headingSel;

    const headingMap = {};
    const content = document.querySelector(contentSel);
    const headings = content.querySelectorAll(headingSel);

    Array.prototype.forEach.call(headings, function (heading) {
      const id = heading.id
        ? heading.id
        : heading.textContent
            .trim()
            .toLowerCase()
            .split(" ")
            .join("-")
            .replace(/[!@#$%^?'’&*():]/gi, "")
            .replace(/\//gi, "-");
      headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
      headingMap[id]
        ? (heading.id = id + "-" + headingMap[id])
        : (heading.id = id);
    });

    function scrollEndCallback(event) {}
    function onClick(event) {}

    const options = {
      onClick,
      scrollEndCallback,
      tocSelector: ".toc",
      contentSelector: contentSel,
      headingSelector: headingSel,
      hasInnerContainers: false,
      linkClass: "toc-link",
      extraLinkClasses: "",
      activeLinkClass: "is-active-link",
      listClass: "toc-list",
      extraListClasses: "",
      isCollapsedClass: "is-collapsed",
      collapsibleClass: "is-collapsible",
      listItemClass: "toc-list-item",
      activeListItemClass: "is-active",
      collapseDepth: 0,
      scrollSmooth: true,
      scrollSmoothDuration: 300,
      scrollSmoothOffset: 0,
      headingsOffset: 75,
      throttleTimeout: 50,
      positionFixedSelector: null,
      positionFixedClass: "is-position-fixed",
      fixedSidebarOffset: "auto",
      includeHtml: false,
      includeTitleTags: false,
      orderedList: true,
      scrollContainer: null,
      skipRendering: false,
      headingLabelCallback: false,
      ignoreHiddenElements: false,
      headingObjectCallback: null,
      basePath: "",
      disableTocScrollSync: false,
      tocScrollOffset: 0,
    };
    return options
  } catch (ex) {
    console.error("table of contents", ex);
  }
}