import { readFileSync, readdirSync, statSync } from 'fs'
import { basename, join } from 'path'

import { Marked } from 'marked'
import { markedEmoji } from 'marked-emoji'
import { emojis } from './emojiObject.js'
import { markedHighlight } from 'marked-highlight'
import markedAlert from 'marked-alert'
import markedFootnote from 'marked-footnote'

import moment from 'moment'
import matter from 'gray-matter'
import hljs from 'highlight.js'

import { JSDOM } from 'jsdom'

// define configuration and plugins for marked library
const marked = new Marked(
  markedAlert(),
  markedFootnote(),
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
  markedEmoji({
    emojis,
    renderer: (token) => token.emoji,
  }),
)

// given a filepath where the resulting file is valid markdown (unchecked)
// obtain system 1. file information, 2. processed markdown (html), 3. frontmatter data
export function parseMarkdown(filePath) {
  const file = readFileSync(filePath, 'utf-8')
  const { birthtime, size } = statSync(filePath)
  const { content, data } = matter(file)
  const readTime = readtime(128, content)
  const htmlContent = marked.parse(content) // this will be where markdown it is called

  if (data.tags) {
    data.tags = data.tags.split(', ')
  }

  console.log(file.includes('/') ? file.split('/')[0] : false)

  return {
    html: addBulmaClasses(htmlContent),
    frontmatter: data,
    birthtime: moment(birthtime).fromNow(),
    fsize: formatsize(size),
    size,
    filePath,
    readTime,
  }
}

/* this calls the above function for each located markdown file */
export function parseAllMarkdown(dirPath, templatePath) {
  const files = readdirSync(dirPath, { recursive: true }).filter((file) => file.endsWith('.md'))

  // return a processed object for each post
  return files.map((file) => {
    const fullPath = join(dirPath, file)
    const { html, frontmatter, birthtime, size, fsize, readTime } = parseMarkdown(fullPath)
    const slug = basename(file, '.md') // simply the file name ex: file.md

    let output = {
      html,
      frontmatter,
      templatePath,
      slug,
      birthtime, 
      size,
      fsize,
      readTime
    }
    
    // this output is given to pug later for display.
    return output
  })
}

function readtime(wpm, markdown) {
  try {
    return markdown.split(' ').length > 0 ? Math.ceil(markdown.split(' ').length / wpm) : 0
  } catch (err) {
    console.error(err)
    return err
  }
}

function formatsize(bytes) {
  try {
    return Math.floor(bytes / 1024) > 0 ? `${Math.floor(bytes / 1024)} Kilobytes` : `${bytes} Bytes`
  } catch (err) {
    console.error(err)
    return err
  }
}

function addBulmaClasses(html) {
  const dom = new JSDOM(html)
  const document = dom.window.document
  const container = document.createElement('div')
  container.innerHTML = html

  const tagClassMap = {
    H1: 'title',
    H2: 'title is-2',
    H3: 'title is-3',
    H4: 'title is-4',
    H5: 'title is-5',
    H6: 'title is-6',
    P: 'content',
    UL: 'unorganized-list',
    OL: 'organized menu-list',
    A: 'is-link',
    TABLE: 'table is-striped is-hoverable is-fullwidth',
    IMG: 'image lightbox-enabled',
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    BUTTON: 'button',
    FORM: 'box',
    SECTION: 'section',
    ARTICLE: 'box',
    NAV: 'navbar',
    '.markdown-alert-warning': 'notification is-warning',
    '.markdown-alert-important': 'notification is-primary',
    '.markdown-alert-tip': 'notification is-info',
    '.markdown-alert-caution': 'notification is-danger'
  }

  for (const [tag, classes] of Object.entries(tagClassMap)) {
    const elements = container.querySelectorAll(tag.toLowerCase())
    elements.forEach((el) => {
      if (el.classList.length === 0) {
        el.className = classes
      } else {
        // Append classes only if not already present
        const toAdd = classes.split(' ').filter((c) => !el.classList.contains(c))
        if (toAdd.length) el.classList.add(...toAdd)
      }
    })
  }

  return container.innerHTML
}
