import 'dotenv/config'
import { processMarkdown } from './markdown-processor.js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import manifest from './manifest.js'

import { githubRepositoryData } from './remote-data.js'

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

// add to object
Object.assign(defaults.app, {
  manifest,
  blog: processMarkdown('src/markdown', {}, 'dist/blog'),
  pages: [],
})

githubRepositoryData(process.env.USERNAME, process.env.GITHUB).then((data) => {
  defaults.app.github = data
  writeFileSync(resolve('src/public', 'template.json'), JSON.stringify(defaults.app), { encoding: 'utf-8' })
}).catch(err => {
  console.log(err)
})

writeFileSync(resolve('src/public', 'manifest.json'), JSON.stringify(defaults.app.manifest), { encoding: 'utf-8' })

export default defaults
