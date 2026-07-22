# castle

:wave:

[![Netlify Status](https://api.netlify.com/api/v1/badges/4a024c61-0ce8-4e72-b415-51c80b99dc97/deploy-status)](https://app.netlify.com/projects/merry-daffodil-ad9c7e/deploys)

This is my personal public webspace's repository. Here you'll see all the code used to construct what I'm calling `castle`.

> [!WARNING]
> **Work In Progress**

```bash
                        # source code directory for /castle
./src
├── markdown
│   └── *.md            # markdown written pages/posts
├── public              # public directory > copied into dist
│   ├── images
│   ├── manifest.json   # application manifest
│   └── robots.txt      # ...
├── scripts
│   ├── modules
│   │   └── *.js        # reusable blocks
│   └── index.js        # javascript entrypoint
├── styles
│   ├── components
│   │   └── _*.scss     # reusuable blocks
│   └── layout.scss     # stylesheet entrypoint
└── views
    ├── templates
    │   └── *.pug       # reuseable templates
    ├── index.pug       # index page
    ├── layout.pug      # sitewide masthead
    └── post.pug        # page template for posts & pages
```

```bash
                                # build time utilites for /castle
./utils
├── emojiObject.js              # object of emoji key/value pairs
├── remoteCollections.js         # 
├── parseMarkdown.js            # handle turning markdown into pug flavored markup
├── plugins
│   ├── JSONWebpackPlugin.js    # provide application data to the front-end
│   ├── SitemapPlugin.js        # generate from site data a site map xml
│   └── SyndicationPlugin.js    # provide posts to the bots (xml/json)
└── remoteCollections.js        # obtain data from remote sources
```

---

## Abstract

Given some markdown files with frontmatter meta information, generate a small website to be hosted on [`netlify`](https://netlify.com).

[]