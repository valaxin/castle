'use strict'

import { join, resolve } from 'node:path'
import { readdir, stat, readFile } from 'fs/promises'
import moment from 'moment'
import pug from 'pug'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { filters, comments, readtime, capitalize, formatsize } from '../utilites/markdown-parser.js'

export async function Posts(directory) {
  const _article = '../templates/_article.pug'
  const posts = []
  const limit = 2
  const words = 200

  try {
    const filenames = await readdir(directory)
    for (const filename of filenames) {
      const stats = await stat(join(directory, filename))
      const markdown = await readFile(join(directory, filename), { encoding: 'utf8' })
      const template = await readFile(join(directory, _article), { encoding: 'utf8' })
      const title = capitalize(filename.split('.')[0], '-')
      const base = resolve()
      const updated = template.replace('#{markdown-path-here}', `/../markdown/${filename}`)
      const post = {
        filename,
        stats: {
          title,
          size: formatsize(stats.size),
          comments: comments(markdown),
          readtime: readtime(words, markdown),
          birthtime: moment(stats.birthtime).format('MM DD YYYY hh:mm:ss a'),
        },
        pug: {
          template: updated,
          options: {
            basedir: base + '/app/templates/',
            compiledebug: true,
            filters: {
              markdown: (string) => filters(string),
            },
          },
        },
        content: {
          markdown,
        },
      }
      posts.push(post)
    }

    for (const selected of posts) {
      const others = []
      for (const post of posts) {
        if (selected.filename != post.filename) {
          if (others.length < limit) {
            others.push({
              filename: post.filename,
              path: post.filename.replace('.md', '.html'),
              title: post.stats.title,
              comments: post.stats.comments,
              readtime: post.stats.readtime,
            })
          }
        }
      }
      selected.others = others
    }
    return posts
  } catch (ex) {
    console.error(ex)
    return ex
  }
}

export async function RenderPugWithPostData(collection, opts) {
  const posts = []

  try {
    for (const post of collection) {
      const options = {
        ...opts.locals,
        ...post.stats,
        ...post.pug.options,
        markdown_filename: post.filename,
        filename: post.filename.replace('.md', '.html'),
        title: post.stats.comments.title,
      }

      pug.render(post.pug.template, options, (ex, html) => {
        if (!ex) {
          post.content.html = html
        } else {
          console.error(ex)
          throw ex
        }
      })

      post.stats.uri = join(opts.dist.split('/')[1], post.filename.replace('.md', '.html'))
      post.stats.dist = opts.dist
      const pluginOptions = {
        hash: true,
        inject: true,
        filename: resolve(opts.dist, post.filename.replace('.md', '.html')),
        scriptLoading: 'module',
        showErrors: true,
        templateContent: post.content.html,
        minify: false,
      }
      posts.push(new HtmlWebpackPlugin(pluginOptions))
    }
    return posts
  } catch (ex) {
    console.error(ex)
    return ex
  }
}

export async function Pages(directory) {
  const files = []
  const folder = await readdir(directory, { recursive: false, withFileTypes: true })
  await folder.filter(async (file) => {
    if (file.isFile()) {
      if (file.name[0] !== '_') {
        files.push(
          new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            filename: file.name.replace('pug', 'html'),
            scriptLoading: 'module',
            showErrors: true,
            template: join(directory, file.name),
            minify: false,
          })
        )
      }
    }
  })
  return files
}
