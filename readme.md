
# castle

> an exersise in rolling my own web-space

## What is this?

javascript written, server side rendered, netlify hosted, personal webspace.

## Concepts and Practices

> posts written in markdown, wrapped in pug and provided as html.

on build the app looks into the `/app/markdown` folder reading each `.md`, info from is used to contruct a pug template wrapper using `/app/templates/_article.pug`

articles are processed independently from webpack, the structure of this application allows for both to be provided the same data.
