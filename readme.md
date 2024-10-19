
# castle

> an exercise in rolling my own webspace.

## What is this?

A javascript based, server side rendered, netlify hosted, personal webspace.

## Concepts and Practices

> Articles are written in markdown, wrapped with pug, and therefore is provided as html.

On build the app looks into the `/app/markdown` folder reading each `.md`, info from is used to contruct a pug template wrapper using `/app/templates/_article.pug`.

---

Technology stack consisting of nodejs, webpack, babel, pugjs, markdown, scss. The idea is that I build a fully functional modern web space one can easily post to, use as a portfolio, display code examples, etc. With an internal design that's flexible and modern following functional and reusable patterns.

---

- A directory containing the pages for the project is read
- A directory containing blog posts for the project is read

```plaintext
[//]: # ({"title": "Title", "creation": "01/01/1970", "summary": "Summary"})
```

> * ^ post meta data is encapsulated in this functional abeit strange looking comment syntax.*

- Data from GitHub and GumRoad are requested
- generate rss/json feed data
- provide all above data to front end
- provide static site to `/dist` folder for public

> *comments are scarce and sometimes nonsense, this is a personal project to learn and develop and I'm very interested in quality practices, however I ask that this doesn't become a soapbox parlour.*

> *changes to any elements or styles on markdown pages located `/blog/post-name.html` currently wont update on save. You can manually restart the application, or work on the template/element agnostically on another page then bring it to `/app/templates/_article.pug` file.*

*This is **very** much a work in progress.*

"app/library/options-generator.js" is our starting point effectively, within there are collector modules that obtain json data saving it to what is basically a large template data object this is passed to webpack and pug however please note that articles using the `_article.pug` template are rendered separately 