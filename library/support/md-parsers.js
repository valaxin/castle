'use strict'

import hljs from 'highlight.js'
import markdownit from 'markdown-it'

import markdownitContainer from 'markdown-it-container'
import * as markdownitEmoji from 'markdown-it-emoji'
import markdownitAbbr from 'markdown-it-abbr'
import * as markdownitDecorate from 'markdown-it-decorate'
import markdownitMark from 'markdown-it-mark'
import markdownitFootnote from 'markdown-it-footnote'
import markdownitIns from 'markdown-it-ins'
import markdownitSub from 'markdown-it-sub'
import markdownitSup from 'markdown-it-sup'
import * as markdownitVideo from 'markdown-it-video'

let count = 0

export function filters(markdown) {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (substring, language) => {
      if (language && hljs.getLanguage(language)) {
        try {
          return hljs.highlight(substring, { language }).value
        } catch (ex) {
          return ex
        }
      }
    },
  })

  md.use(markdownitContainer, 'warning', [])
  md.use(markdownitContainer, 'spoiler', [])
  md.use(markdownitContainer, 'information', [])
  md.use(markdownitEmoji.full, [])
  md.use(markdownitAbbr, [])
  md.use(markdownitDecorate.default, [])
  md.use(markdownitMark, [])
  md.use(markdownitFootnote, [])
  md.use(markdownitIns, [])
  md.use(markdownitSub, [])
  md.use(markdownitSup, [])
  md.use(markdownitVideo.default, [])
  count++
  return md.render(markdown)
}

export function comments(markdown) {
  const comment = markdown.match(/\[\/\/\]: # \({(.*?)}\)/g)
  if (comment !== null) {
    const objstring = comment[0].replace('[//]: # (', '').slice(0, -1)
    const data = JSON.parse(objstring)
    return data
  } else {
    return 0
  }
}

export function readtime(wpm, markdown) {
  return markdown.split(' ').length > 0 ? Math.ceil(markdown.split(' ').length / wpm) : 0
}

export function capitalize(markdown, delimiter) {
  return markdown
    .split(delimiter)
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
}

export function formatsize(bytes) {
  return Math.floor(bytes / 1024) > 0 ? `${Math.floor(bytes / 1024)} kilobytes` : `${bytes} bytes`
}
