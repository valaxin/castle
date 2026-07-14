export default class sitemapPlugin {
  constructor () {

  }

  apply () {
    compiler.hooks.thisCompilation.tap('SyndicationPlugin', (compilation) => {
      
      const self = this.options.data?.self || new Error('missing data')
      
      compilation.hooks.additionalAssets.tapAsync('SyndicationPlugin', (callback) => {
        console.log('[webpack] in sitemapPlugin.js callback method, before asset emission', self)
        compilation.emitAsset('sitemap.html', new compiler.webpack.sources.RawSource(``))
        callback()
      })
    })
  }
}