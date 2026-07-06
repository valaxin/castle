// make json and xml consuables

import { Feed } from 'feed'

const title = 'valaxin.dev'
const description = ''
const date = new Date()

const staticMetadata = {
  title,
  description,
  id: `https://${title}`,
  link: `https://${title}`,
  language: 'en',
  image: `https://${title}/_/image.png`,
  favicon: `https://${title}/favicon.png`,
  copyright: date.getFullYear(),
  updated: date,
  feedLinks: {
    json: `https://${title}/feed.json`,
    atom: `https://${title}/feed.xml`,
  },
  author: {
    name: 'valaxin',
    email: '-',
    link: `https://${title}`,
  },
}

/** -- Based on type string (xml|json) process the data using @npm/feed */
function generate (content) {
  let feed = new Feed(staticMetadata)
  if (content) {
    for (const post of content) {
      if (post.frontmatter.syndication) {
        feed.addItem(post)
      }
    }
  }
  return feed
}

/** -- Webpack plugin */
export default class SyndicationPlugin {
  // ... take in options from webpack build script
  constructor(options) {
    this.options = options || {}
    // console.log('SyndicationPlugin', this.options.data.self)
  }

  // define apply func passing webpack compiler
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('SyndicationPlugin', (compilation) => {
      
      // options passed made available...
      // turned into feeds
      const self = this.options.data?.self || new Error('missing data')
      const feed = generate(self.posts)
      const feedXML = feed.rss2()

      // console.log(feedXML)

      // the comp hook provide tap access to asset emission during build
      compilation.hooks.additionalAssets.tapAsync('SyndicationPlugin', (callback) => {
        compilation.emitAsset('feed.json', new compiler.webpack.sources.RawSource(JSON.stringify(feed)))
        compilation.emitAsset('feed.xml', new compiler.webpack.sources.RawSource(feedXML))
        callback()
      })
    })
  }
}

