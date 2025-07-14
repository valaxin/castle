import { basename, join } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { readFileSync, readdirSync } from 'fs'

/* --- */

export function parseMarkdown(filePath) {
  const file = readFileSync(filePath, 'utf-8')
  const { content, data } = matter(file)
  const htmlContent = marked(content)
  return {
    html: htmlContent,
    frontmatter: data,
    filePath,
  }
}

/* --- */

export function parseAllMarkdown(dirPath, templatePath) {
  const files = readdirSync(dirPath).filter(file => file.endsWith('.md'))
  return files.map(file => {
    const fullPath = join(dirPath, file)
    const { html, frontmatter } = parseMarkdown(fullPath)
    const slug = basename(file, '.md')
    return {
      html,
      frontmatter,
      templatePath,
      slug,
    }
  })
}
