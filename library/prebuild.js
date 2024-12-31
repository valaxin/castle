'use strict'

import 'dotenv/config'
import * as url from 'url'
import { join } from 'node:path'
import { readdir, writeFile } from 'fs/promises'

import { Pages, Posts, RenderPugWithPostData } from './data/content.js'
import GumRoadProducts from './data/products.js'
import GitHubrepositories from './data/repositories.js'
import Syndication from './support/syndication.js'
import WebManifest from './support/manifest.js'
import SitemapXML from './data/sitemap.js'

const __dirname = url.fileURLToPath(new URL('..', import.meta.url))

// 0. Initalized
const options = {
  sys: {
},
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  server: {
    host: '127.0.0.1',
    port: '3000',
  },
  app: {},
  entry: {
    base: __dirname,
    directory: 'app',
    filename: 'index.js',
  },
  output: {
    directory: 'dist',
    filename: 'bundle.js',
    options: {
      lint: true,
      minify: false,
    },
  },
}

// [PREBUILD] Assign information to different keys within `options` object.
// 1. Define a folders object to hold the `/app` directory information
//    filter out files saving only folder names and paths.
options.sys.folders = {}
const _folders = await readdir(join(__dirname, options.entry.directory), { withFileTypes: true })
await _folders.filter(async (folder) => {
  if (folder.isFile() === false) {
    options.sys.folders[folder.name] = join(folder.parentPath, folder.name)
  }
})

// 2,1. Assign the client template data to `options.app` key.
options.app.map = SitemapXML()
options.app.manifest = WebManifest()
options.app.pages = await Pages(options.sys.folders.templates)
options.app.cache = await Posts(options.sys.folders.markdown)
options.app.wares = await GumRoadProducts()
options.app.repos = await GitHubrepositories()

// 2,2. Process pug wrapped markdown template, and place the
//      HTML document a `/blog` sub folder `of `/dist`.
options.app.posts = await RenderPugWithPostData(options.app.cache, { dist: 'dist/blog', locals: options.app })

// 3,1. Save data to be see at 'host:port/manifest.json'
await writeFile(
  join(options.sys.folders.public, 'manifest.json'),
  JSON.stringify(options.app.manifest),
  'utf8',
  (ex) => {
    if (ex) {
      console.error(ex)
    }
  }
)
// 3,2. Save data to be seen at 'host:post/template-data.json'
await writeFile(
  join(options.sys.folders.public, 'template-data.json'),
  JSON.stringify(options.app),
  'utf8',
  (ex) => {
    if (ex) {
      console.error(ex)
    }
  }
)
// 4,1. generate JSON/XML feeds endpoints
Syndication(options)

// 4,2. Save data to be seen at 'host:port/sitemap.xml'
await writeFile(
  join(options.sys.folders.public, 'sitemap.xml'),
  JSON.stringify(options.app.map),
  'utf8',
  (ex) => {
    if (ex) {
      console.error(ex)
    }
  }
)
// 5. Done...
export default options
