# castle

:wave:

This is my personal public webspace's repository. Here you'll see all the code used to construct what I'm calling `castle`.

> [!WARNING]
> **Work In Progress**

```shell
                        # source code directory for /castle
./src
├── markdown
│   └── *.md            # markdown written pages/posts
├── public              # public directory > copied into dist
│   ├── images
│   ├── manifest.json   # application manifest
│   └── robots.txt      # ...
├── scripts
│   ├── components
│   │   └── *.js        # reusable blocks
│   └── index.js        # javascript entrypoint
├── styles
│   ├── components
│   │   └── _*.scss     # reusuable blocks
│   └── layout.scss     # stylesheet entrypoint
└── views
    ├── components
    │   └── *.pug       # reuseable templates
    ├── index.pug       # html body
    ├── layout.pug      # sitewide html head
    └── post.pug        # template for generated markdown documents
```

```shell
                                # build time utilites for /castle
./utils
├── emojiObject.js              # object of emoji key/value pairs
├── interfaceManager.js         # 
├── parseMarkdown.js            # handle turning markdown into pug flavored markup
├── plugins
│   ├── JSONWebpackPlugin.js    # provide application data to the front-end
│   └── SyndicationPlugin.js    # provide posts to the bots
└── remoteCollections.js        # obtain data from remote sources (github/gumroad)
```