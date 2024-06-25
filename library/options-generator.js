"use strict";

import 'dotenv/config'
import * as url from "url";
import { join } from "node:path";
import { readdir, writeFile } from "fs/promises";
import WebManifest from '../app/public/manifest.json' with { type: 'json' }
import PageCollector from "./sources/template-pages.js";
import { RenderPugWithData, PostCollector } from './sources/markdown-posts.js';

const __dirname = url.fileURLToPath(new URL("..", import.meta.url));

const options = {
  sys: {},
  mode: process.env.MODE,
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  app: {
    manifest: WebManifest,
  },
  entry: {
    base: __dirname,
    directory: process.env.ENTRY_DIR,
    filename: process.env.ENTRY_FILE
  },
  output: {
    directory: process.env.OUTPUT_DIR,
    filename: process.env.OUTPUT_FILE,
    options: {
      lint: process.env.OPT_LINT,
      minify: process.env.OPT_MINI
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
options.app.posts = await RenderPugWithData(options.app.cache, { dist: `${process.env.OUTPUT_DIR}/${process.env.BLOG_SUBDIR}`, locals: options.app })

// [prebuild action]
// -- write data to be seen at 'host:post/TEMPLATE_DATA_FILE'
await writeFile(join(options.sys.folders.public, process.env.TEMPLATE_DATA_FILE), JSON.stringify(options.app), 'utf8', (ex) => {
  if (ex) {
    console.error(ex)
  }
});

// off to webpack for final build steps. 
export default options
