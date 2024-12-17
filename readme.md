
# castle

> an exercise in rolling my own webspace.

## What is this?

A javascript written, server side rendered, netlify hosted, webspace. Somewhere I can share collections of information. lightweight is somewhat of concern here I don't intend on spending much to get this space functional.

## Concepts and Practices

> Articles are written in markdown, wrapped with pug, and therefore is provided as html.

On build the app looks into the `/app/markdown` folder reading each `.md`, info from is used to contruct a pug template wrapper using `/app/templates/_article.pug`.

The technology stack consists of `nodejs`, `webpack`, `pugjs`, `markdown`, `scss`. The idea here is to build out a fully functional modern webspace that someone can easily post content too, use as a portfolio, display code examples, etc. With an internal design that is flexible following functional and reusable patterns.

---

## `castle/library/scaffold.js`

1. The directory containing the page templates for the project is read
2. The directory containing markdown blog posts for the project is read

```plaintext
[//]: # ({"title": "Title", "creation": "01/01/1970", "summary": "Summary"})
```
*post meta data is encapsulated in this comment syntax. as the first line in the document*

3. Data from GitHub, GumRoad, <strike>Spotify</strike>, <strike>Twitch</strike>, and <strike>BlueSky</strike> are requested
4. Generate rss/json feed data
5. Provide all above data to front end via JSON
6. Provide static site to `/dist` folder for public via webpack


> [!NOTE]  
> *Code comments are scarce and sometimes nonsense, this is a personal project to learn and develop my own abilities.*

Changes to any elements or styles on markdown pages located `/blog/post-name.html` currently wont update on save. You can manually restart the application, or work on the template/element agnostically on another page then bring it to `/app/templates/_article.pug` file.

> [!WARNING]
> *This is **very** much a work in progress.*

"app/library/options-generator.js" is our starting point effectively, within there are collector modules that obtain json data saving it to what is basically a large template data object this is passed to webpack and subsiquently pug however please note that articles using the `_article.pug` template are rendered separately until a better method of providing markdown handling within the template.
