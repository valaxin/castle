[//]: # ({"title": "castle/readme", "creation": "01/08/2024", "summary": "The 'readme.md' document for the project presenting this webpage", "thumbnail": "/images/image.webp"})


# castle

> an exersise in rolling my own web-space

## What is this?

javascript written, server side rendered, netlify hosted, personal webspace.

## Concepts and Practices

> posts written in markdown, wrapped in pug and provided as html.

on build the app looks into the `/app/markdown` folder reading each `.md`, info from is used to contruct a pug template wrapper using `/app/templates/_article.pug`

articles are processed independently from webpack, the structure of this application allows for both to be provided the same data.

---

I'm taking a technology stack consisting of nodejs, webpack, babel, pugjs, markdown, scss. The idea is that I build a fully functional modern web space one can easily post to, use as a portfolio, display code examples, host a software for use or download, etc. With an internal design that's flexible and modern following functional and reusable patterns... mostly.

---

- A directory containing the pages for the project is read
- A directory containing blog posts for the project is read

```plaintext
[//]: # ({"title": "Title", "creation": "01/01/1970", "summary": "Summary"})
```
  
  > *^ post meta data is encapsulated in this functional abeit strange looking comment syntax.*

- Data from GitHub and GumRoad are requested
- generate rss/json feed data
- provide all above data to front end
- provide static site to `/dist` folder for public

> *comments are scarce and sometimes nonsense, this is a personal project to learn and develop and I'm very interested in quality practices, however I ask that this doesn't become a soapbox parlour.*
> *changes to any elements or styles on markdown pages located `/blog/post-name.html` currently wont update on save. You can manually restart the application, or work on the template/element agnostically on another page then bring it to `/app/templates/_article.pug` file.*

*This is **very** much a work in progress.*

![Oleg Prachuk > Pexels](https://images.pexels.com/photos/21419467/pexels-photo-21419467/free-photo-of-view-of-red-toyota-crown-comfort-taxis-on-a-street-in-hong-kong-china.jpeg "Oleg Prachuk > Pexels")