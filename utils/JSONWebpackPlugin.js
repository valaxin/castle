'use strict'

// mostly just a dev tool.

export default class JSONWebpackPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    
    const opt = this.options
    
    if (!opt.data) {
      opt.data = { message: 'no data' }
    }
    
    if (!opt.filename) {
      opt.filename = 'template-data.[hash:8].json'
    }

    compiler.hooks.thisCompilation.tap('JSONWebpackPlugin', (compilation) => {

      // set timestamp
      opt.data.epoch = Date.now()

      // emit asset into build
      compilation.hooks.additionalAssets.tapAsync('JSONWebpackPlugin', (callback) => {
        compilation.emitAsset(opt.filename, new compiler.webpack.sources.RawSource(JSON.stringify(opt.data)))
        callback()
      })
    })
  }
}