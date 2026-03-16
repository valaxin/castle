import { Feed } from 'feed'
import { readFileSync } from 'fs'

const staticMetadata = {
  title: 'valaxin.dev',
  description: 'This is my personal feed!',
  id: 'https://valaxin.dev',
  link: 'https://valaxin.dev',
  language: 'en',
  image: 'https://valaxin.dev/_/image.png',
  favicon: 'https://valaxin.dev/favicon.png',
  copyright: '2025',
  updateded: new Date(),
  feedLinks: {
    json: 'https://valaxin.dev/feed.json',
    atom: 'https://valaxin.dev/feed.xml',
  },
  author: {
    name: 'valaxin',
    email: '-',
    link: 'https://valaxin.dev',
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

