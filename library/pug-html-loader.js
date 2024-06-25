'use strict'

import util from 'loader-utils'
import pug from 'pug'

let cachedDeps = []

/**
 * Pug HTML Loader, turns pug templates into html.
 * use relative paths with any unprefixed template.
 * data is provided within `webpack.config.js`
 * @author valaxin
 * @param {String} source pug template string data
 * @returns result of compiling pug templates provided to webpack
 */

export default function (source) {
  let query = {}
  let template = {}

  // This statement seems unnecessary as of webpack5.
  // Contextual cacheable method defaults to true.
  // Refer to : https://webpack.js.org/api/loaders/#thiscacheable
  if (this.cacheable) {
    this.cacheable(true)
  }

  // If the query provided in context is a string,
  // convert it to an object and store locally.
  if (typeof this.query === 'string') {
    query = util.parseQuery(this.query)
  } else {
    query = this.query
  }

  // let req = util.getRemainingRequest(this)

  // Define the options object for pug.
  const options = Object.assign(
    {
      filename: this.resourcePath,
      doctype: query.doctype || 'js',
      compileDebug: this.debug || false,
    },
    query
  )

  // If options.plugins is defined but isn't an Array,
  // make it an Array.
  if (options.plugins) {
    if (!(options.plugins instanceof Array)) {
      options.plugins = [options.plugins]
    }
  }

  // Attempt to provide options to pug, if an error occurs,
  // pass the error to the callback and return.
  try {
    template = pug.compile(source, options)
  } catch (ex) {
    cachedDeps.forEach(this.addDependency)
    this.callback(ex)
    return
  }

  // Cached dependencies is an Array of template dependency paths.
  cachedDeps = template.dependencies ? template.dependencies.slice() : undefined

  // Add each dependency string to loader context.
  // Refer to: https://webpack.js.org/api/loaders/#thisadddependency
  template.dependencies.forEach((item, i) => {
    this.addDependency(item)
  })

  const data = query.data || {}
  return template(data)
}
