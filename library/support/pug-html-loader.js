'use strict'

import pug from 'pug'
import 'dotenv/config'
import util from 'loader-utils'

let cachedDeps = []

export default function (source) {
  let query = {}
  let template = {}

  if (this.cacheable) {
    this.cacheable(true)
  }

  if (typeof this.query === 'string') {
    query = util.parseQuery(this.query)
  } else {
    query = this.query
  }

  const options = Object.assign(
    {
      filename: this.resourcePath,
      doctype: query.doctype || 'js',
      compileDebug: this.debug || false,
    },
    query
  )

  if (options.plugins) {
    if (!(options.plugins instanceof Array)) {
      options.plugins = [options.plugins]
    }
  }

  try {
    template = pug.compile(source, options)
  } catch (ex) {
    cachedDeps.forEach(this.addDependency)
    this.callback(ex)
    return
  }

  cachedDeps = template.dependencies ? template.dependencies.slice() : undefined

  template.dependencies.forEach((item, i) => {
    this.addDependency(item)
  })

  const data = query.data || {}
  return template(data)
}
