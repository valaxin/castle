---
id: '002'
title: Raspberry Music for Penguins
subtitle: 'Simple guide to locally hosting jellyfin on a raspberry pi 3 B+'
published: 3/2026
tags: tutorial linux raspberry-pi self-hosted ubuntu
summary: A simple setup guide to local music streaming
thumbnail: '@images/static/raspberries.jpg'
thumbnailAlt: William Mason Brown (1828-1898) “Raspberries in a Wooded Landscape”. Oil on canvas.
author: valaxin
visible: false
---
> This document serves to outline the structure of my personal webspace.


# Purpose & Goals
A general purpose webspace for both testing ideas that may require quick deployment.
An wysiwyg type blog engine created to specifically to tackle my needs.
Make accessible means of contact for professional opportunities.

# Index
On the index page the user is presented with information about the owner.
There should be at **minimum** 4 sections
	1. About
	2. Blog
	3. Projects
	4. Contact

## App Stack

1. Runtime Environment: `nodejs`
2. Module Bundler: `webpack`
3. Client Markup: `pug`
4. Client Styles: `sass/scss`
5. Functionality: `javascript` 

- A `webpack` file is configured to watch the project directory for files of interest.
- During development a server is enabled and the application will be available on a local port.
- When changes happen during development the application is automatically reloaded.

-  the `markdown` directory is read, `.md` files within are ingested and parsed into HTML.
-  the HTML is provided to a PUG template wrapper and then parsed by the pug renderer and deposited into the output directory, filename routing so no whacky characters.
-  styles and javascript are processed into the `bundle.js` and provided to the client.
-  when not development the css is a separate file.