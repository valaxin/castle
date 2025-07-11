# castle

> [!important]
> project very much a work in progress and anything cloned will likely be non-functional.

## About

This project aims to provide a simple personal webspace, at this point it's totally configured for my own use without any serious attention to documentation.

Castle uses nodejs, and webpack to construct an static application that's then served on netlify's platform.

---

### Goals

- A simple to write for blogging solution, `.md` files make for an easy writing experience. Since they compile to valid HTML we can use them as templates.

If we wrap a markdown document in a pug template we can use the filter functions built into pug to process the markdown to our liking, once processed we can convert the whole pug template into html and provide it to the client.

