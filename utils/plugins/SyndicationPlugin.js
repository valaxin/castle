import { Feed } from 'feed'
import { readFileSync } from 'fs'

// feed defs (hardcoded til complete)
const staticMetadata = {
  title: 'valaxin.dev',
  description: 'This is my personal feed!',
  id: 'https://valaxin.dev',
  link: 'https://valaxin.dev',
  language: 'en',
  image: 'http://example.com/image.png',
  favicon: 'http://example.com/favicon.png',
  // copyright: '',
  // updated: '',
  // generator: '',
  feedLinks: {
    json: 'https://valaxin.dev/feed.json',
    atom: 'https://valaxin.dev/feed.xml',
  },
  author: {
    name: 'valaxin',
    email: '-',
    link: 'valaxin.dev',
  },
}

/** -- Based on type string (xml|json) process the data using @npm/feed */
function generate (type, content) {
  const feed = new Feed(staticMetadata)
  if (type === 'xml') {}
  if (type === 'json') {}
}

/** -- Webpack plugin */
export default class SyndicationPlugin {
  constructor(options) {
    this.options = options || {}
    console.log('SyndicationPlugin', this.options.data)
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('SyndicationPlugin', (compilation) => {
      const opt = this.options
      
      const xml = generate('xml', opt.data)

      console.log(xml)

      compilation.hooks.additionalAssets.tapAsync('SyndicationPlugin', (callback) => {
        // compilation.emitAsset(opt.filename, new compiler.webpack.sources.RawSource(JSON.stringify(opt.data)))
        callback()
      })
    })
  }
}

