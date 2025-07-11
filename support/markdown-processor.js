'use strict'

import pug from 'pug'
import moment from 'moment'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join, resolve } from 'path'
import { readdirSync, statSync, readFileSync } from 'fs'
import { site, manifest } from './data-local.js'

import hljs from 'highlight.js'
import markdownit from 'markdown-it'

import { ins } from '@mdit/plugin-ins'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import { mark } from '@mdit/plugin-mark'
import { abbr } from '@mdit/plugin-abbr'
import { tasklist } from '@mdit/plugin-tasklist'
import { footnote } from '@mdit/plugin-footnote'
import { container } from '@mdit/plugin-container'
import { imgLazyload } from '@mdit/plugin-img-lazyload'

import markdownitKbd from 'markdown-it-kbd'
import * as markdownitEmoji from 'markdown-it-emoji'
import * as markdownitVideo from 'markdown-it-video'

function filter(markdown) {
  try {
    const md = markdownit({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (substring, language) => {
        if (language && hljs.getLanguage(language)) {
          try {
            return hljs.highlight(substring, { language }).value
          } catch (err) {
            throw err
          }
        }
      },
    })

    md.use(container, { name: 'warning' })
    md.use(container, { name: 'spoiler' })
    md.use(container, { name: 'information' })
    md.use(imgLazyload, [])
    md.use(ins, [])
    md.use(sub, [])
    md.use(sup, [])
    md.use(abbr, [])
    md.use(mark, [])
    md.use(footnote, [])
    md.use(tasklist, [])

    md.use(markdownitEmoji.full, [])
    md.use(markdownitVideo.default, [])
    md.use(markdownitKbd, [])

    return md.render(markdown)
  } catch (err) {
    console.error(err)
    return err
  }
}

function metadata(markdown) {
  try {
    const comment = markdown.match(/\[\/\/\]: # \({(.*?)}\)/g)
    if (comment !== null) {
      const objstring = comment[0].replace('[//]: # (', '').slice(0, -1)
      const data = JSON.parse(objstring)
      return data
    } else {
      throw new Error('unable to parse comments from markdown')
    }
  } catch (err) {
    console.error(err)
    return err
  }
}

function readtime(wpm, markdown) {
  try {
    return markdown.split(' ').length > 0 ? Math.ceil(markdown.split(' ').length / wpm) : 0
  } catch (err) {
    console.error(err)
    return err
  }
}

function capitalize(markdown, delimiter) {
  try {
    return markdown
      .split(delimiter)
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1)
      })
      .join(' ')
  } catch (err) {
    console.error(err)
    return err
  }
}

function formatsize(bytes) {
  try {
    return Math.floor(bytes / 1024) > 0 ? `${Math.floor(bytes / 1024)} kilobytes` : `${bytes} bytes`
  } catch (err) {
    console.error(err)
    return err
  }
}

export function processMarkdown(directory, locals, outputdir) {
  const article_template = '../views/pages/_post.pug'
  const posts = []
  const pluginInstances = []
  const encoding = { encoding: 'utf8' }
  const limit = 2
  const words = 200

  try {
    const filenames = readdirSync(directory)
    for (const filename of filenames) {
      const stats = statSync(join(directory, filename))
      const markdown = readFileSync(join(directory, filename), encoding)
      const template = readFileSync(join(directory, article_template), encoding)
      const title = capitalize(filename.split('.')[0], '-')
      const post = {
        filename,
        content: {
          markdown,
          template: template.replace('#{markdown-path-here}', `/../../markdown/${filename}`),
        },
        data: {
          title,
          size: formatsize(stats.size),
          meta: metadata(markdown),
          readtime: readtime(words, markdown),
          birthtime: moment(stats.birthtime).format('MM DD YYYY hh:mm:ss a'),
          slug: join(outputdir.split('/')[1], filename.replace('.md', '.html')),
          dist: outputdir
        },
        static: site
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
              title: post.data.title,
              meta: post.data.meta,
              readtime: post.data.readtime,
            })
          }
        }
      }
      selected.others = others
    }

    for (const post of posts) {
      Object.assign(locals, post)
      const renderOptions = Object.assign(
        {
          basedir: resolve('src/views/pages'),
          // debug: true,
          // cache: true,
          filters: {
            markdown: (string) => filter(string),
          },
        },
        locals
      )
      post.content.html = pug.render(post.content.template, renderOptions)
      pluginInstances.push(
        new HtmlWebpackPlugin({
          hash: true,
          inject: true,
          filename: resolve(outputdir, post.filename.replace('.md', '.html')),
          scriptLoading: 'module',
          showErrors: true,
          templateContent: post.content.html,
          minify: false,
        })
      )
    }
    return { posts, pluginInstances }
  } catch (err) {
    console.error(err)
    return err
  }
}
