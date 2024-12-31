
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
> [!NOTE]
> I think maybe also having a tag break could work.
> as then with css this can be hidden to the client... 

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
> Anything is subject to change at any time without any more warning than this.

---

> Since Github gave us `Copilot` for free here's what it has to say about my project.

### This project is a personal webspace built using JavaScript, Node.js, Webpack, Pug, Markdown, and SCSS. It is designed to be server-side rendered and hosted on Netlify

#### The main features include

- Markdown Articles: Articles are written in Markdown, wrapped with Pug templates, and converted to HTML during the build process.
- Static Site Generation: The project generates a static site, which is output to the /dist folder.
- Blog and Pages: It includes a blog section where Markdown files from the markdown directory are processed and rendered as HTML pages.
- Table of Contents: The project uses tocbot to generate a table of contents for blog posts.
- Styling: The project uses SCSS for styling, with various components and layout styles defined.
- Data Integration: It fetches data from external sources like GitHub and GumRoad to display on the site.
- RSS/JSON Feeds: It generates RSS and JSON feed data for the blog posts.
The project aims to be a flexible and modern webspace for posting content, displaying a portfolio, and sharing code examples.
