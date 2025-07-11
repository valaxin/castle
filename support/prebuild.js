/**
 * @module prebuild
 * @description
 * Prebuild script for preparing site data and assets before bundling.
 * - Loads environment variables.
 * - Processes markdown content for the blog.
 * - Fetches remote data (GitHub repositories, Gumroad products).
 * - Combines local and remote data into a single app object.
 * - Writes processed data to JSON files for use in the build.
 *
 * @requires dotenv/config
 * @requires ./markdown-processor.js
 * @requires fs
 * @requires path
 * @requires ./data-remote.js
 * @requires ./data-local.js
 *
 * @exports {Object} defaults - The complete app configuration and data.
 * @exports {Object} pugdata - Data subset for Pug templates.
 */

import 'dotenv/config'
import { processMarkdown } from './markdown-processor.js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { repositories, products } from './data-remote.js'
import { site, manifest } from './data-local.js'

const mode = process.env.NODE_ENV === 'production' ? true : false

const defaults = {
  mode: mode ? 'production' : 'development',
  _: {},
  app: new Object(),
  entry: {
    base: process.cwd(),
    directory: 'src',
    filename: 'index.js',
  },
  output: {
    directory: 'dist',
    filename: 'bundle.js',
    options: {
      lint: true,
      minify: mode,
    },
  },
}

Object.assign(defaults.app, {
  manifest,
  blog: processMarkdown('src/markdown', {}, 'dist/blog'),
  static: site,
  pages: site.pages,
})

defaults.app.github = await repositories(process.env.USERNAME, process.env.GITHUB),
defaults.app.gumroad = await products(process.env.GUMROAD)

writeFileSync(
  resolve('src/public', 'template.json'),
  JSON.stringify(defaults.app),
  { encoding: 'utf-8' }
)

writeFileSync(
  resolve('src/public', 'manifest.json'),
  JSON.stringify(defaults.app.manifest),
  { encoding: 'utf-8' }
)

const pugdata = {
  title: 'castle',
  posts: defaults.app.blog.posts,
  github: defaults.app.github,
  gumroad: defaults.app.gumroad,
  manifest: defaults.app.manifest,
  static: defaults.app.static
}

console.log({ pugdata, defaults })

export default { defaults, pugdata }

