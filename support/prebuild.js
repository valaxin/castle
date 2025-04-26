import 'dotenv/config'
import { processMarkdown } from './markdown-processor.js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import manifest from './manifest.js'

import { repositories, products } from './remote-data.js'

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
  pages: [],
})


defaults.app.github = await repositories(process.env.USERNAME, process.env.GITHUB),
defaults.app.gumroad = await products(process.env.GUMROAD)

writeFileSync(resolve('src/public', 'template.json'), JSON.stringify(defaults.app), { encoding: 'utf-8' })
writeFileSync(resolve('src/public', 'manifest.json'), JSON.stringify(defaults.app.manifest), { encoding: 'utf-8' })

console.log(defaults)


export default defaults

