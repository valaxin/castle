"use strict";

import 'dotenv/config'
import * as url from "url";
import { join } from "node:path";
import { readdir, writeFile } from "fs/promises";
import WebManifest from '../app/public/manifest.json' with { type: 'json' }
import PageCollector from "./sources/template-pages.js";
import { RenderPugWithData, PostCollector } from './sources/markdown-posts.js';
import feeds from './syndication-generator.js';

const __dirname = url.fileURLToPath(new URL("..", import.meta.url));

const options = {
  sys: {},
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  server: {
    host: '127.0.0.1',
    port: '3000',
  },
  app: {
    manifest: WebManifest,
  },
  entry: {
    base: __dirname,
    directory: 'app',
    filename: 'index.js'
  },
  output: {
    directory: 'dist',
    filename: 'bundle.js',
    options: {
      lint: true,
      minify: false
    },
  },
};

// [prebuild action]
// -- collect one level deep of subfolders from given parent folder path.
options.sys.folders = {}
const _folders = await readdir(join(__dirname, options.entry.directory), { withFileTypes: true })
await _folders.filter(async folder => {
  if (folder.isFile() === false) {
    options.sys.folders[folder.name] = join(folder.parentPath, folder.name)
  }
})

// [prebuild actions]
// -- ~raw~doggin~ some assignment.
options.app.pages = await PageCollector(join(options.sys.folders.templates)),
options.app.cache = await PostCollector(options.sys.folders.markdown)
options.app.posts = await RenderPugWithData(options.app.cache, { dist: 'dist/blog', locals: options.app })

// [prebuild action]
// -- write data to be seen at 'host:post/TEMPLATE_DATA_FILE'
await writeFile(join(options.sys.folders.public, 'template-data.json'), JSON.stringify(options.app), 'utf8', (ex) => {
  if (ex) {
    console.error(ex)
  }
});

// [prebuild action]
// -- generate JSON/XML feeds for syndication
feeds(options)

// off to webpack for final build steps. 
export default options
