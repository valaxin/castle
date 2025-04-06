import 'dotenv/config'
import { processMarkdown } from './markdown-processor.js'

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

//
defaults.app.blog = processMarkdown('src/markdown', {}, 'dist/blog')

console.log(defaults.app.blog.posts)

// ---

// [PREBUILD] Assign information to different keys within `options` object.
// 1. Define a folders object to hold the `/app` directory information
//    filter out files saving only folder names and paths.

// 2,1. Assign the client template data to `options.app` key.
// 2,2. Process pug wrapped markdown template, and place the
//      HTML document a `/blog` sub folder `of `/dist`.

// 3,1. Save data to be see at 'host:port/manifest.json'
// 3,2. Save data to be seen at 'host:post/template-data.json'

// 4,1. generate JSON/XML feeds endpoints
// 4,2. Save data to be seen at 'host:port/sitemap.xml'

// 5. Done...

export default defaults
