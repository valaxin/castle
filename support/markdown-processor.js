'use strict'

import pug from 'pug'
import moment from 'moment'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join, resolve } from 'path'
import { readdirSync, statSync, readFileSync } from 'fs'

import hljs from 'highlight.js'
import markdownit from 'markdown-it'
import markdownitIns from 'markdown-it-ins'
import markdownitSub from 'markdown-it-sub'
import markdownitSup from 'markdown-it-sup'
import markdownitMark from 'markdown-it-mark'
import markdownitAbbr from 'markdown-it-abbr'
import markdownitFootnote from 'markdown-it-footnote'
import markdownitContainer from 'markdown-it-container'
import * as markdownitEmoji from 'markdown-it-emoji'
import * as markdownitDecorate from 'markdown-it-decorate'
import * as markdownitVideo from 'markdown-it-video'

let count = 0

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

    // define all the filters to be used...
    md.use(markdownitContainer, 'warning', [])
    md.use(markdownitContainer, 'spoiler', [])
    md.use(markdownitContainer, 'information', [])
    md.use(markdownitDecorate.default, [])
    md.use(markdownitEmoji.full, [])
    md.use(markdownitAbbr, [])
    md.use(markdownitIns, [])
    md.use(markdownitSub, [])
    md.use(markdownitSup, [])
    md.use(markdownitMark, [])
    md.use(markdownitFootnote, [])
    md.use(markdownitVideo.default, [])

    // increment post count
    count++

    // return
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
  // set...
  const article_template = '../views/post.pug'
  const posts = []
  const pluginInstances = []
  const encoding = { encoding: 'utf8' }
  const limit = 2
  const words = 200

  // begin...
  try {
    const filenames = readdirSync(directory)

    // loop over each file in directory
    for (const filename of filenames) {
      // collect post and info about
      const stats = statSync(join(directory, filename))
      const markdown = readFileSync(join(directory, filename), encoding)
      const template = readFileSync(join(directory, article_template), encoding)
      const title = capitalize(filename.split('.')[0], '-')

      // create outgoing post object with processed information
      const post = {
        filename,
        content: {
          markdown,
          template: template.replace('#{markdown-path-here}', `/../markdown/${filename}`),
        },
        data: {
          title,
          size: formatsize(stats.size),
          meta: metadata(markdown),
          readtime: readtime(words, markdown),
          birthtime: moment(stats.birthtime).format('MM DD YYYY hh:mm:ss a'),
          slug: join(outputdir.split('/')[1], filename.replace('.md', '.html')),
          dist: outputdir,
        },
      }

      // push to array outside of loop
      posts.push(post)
    }

    // once created we loop again
    for (const selected of posts) {
      const others = []
      // then for each we loop each post selecting the
      // first n=%limit% that isn't 'this' post
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

    // ... looping again each post, this time
    // ... to render the html with pug and pass it
    // to html-webpack-plugin
    for (const post of posts) {
      Object.assign(locals, post)
      const renderOptions = Object.assign(
        {
          basedir: resolve('src/views'),
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
