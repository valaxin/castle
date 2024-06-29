'use strict'

import { writeFile } from 'fs/promises'
import { join } from 'node:path'
import { createHmac } from 'node:crypto'
import { Feed } from 'feed'

export default async function (options) {
  try {
    const feed = new Feed({
      title: 'valaxin/blog',
      description: 'valaxin/blog',
      id: 'https://valaxin.dev/',
      link: 'https://valaxin.dev/',
      language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
      image: '/favicon.png',
      favicon: '/favicon.png',
      copyright: 'ATTRIBUTION-NONCOMMERCIAL-SHAREALIKE 4.0 INTERNATIONAL',
      updated: new Date(2024, 1, 1), // optional, default = today
      generator: false, // optional, default = 'Feed for Node.js'
      feedLinks: {
        json: '/feed.json',
        atom: '/feed.xml',
      },
      author: {
        name: 'valaxin',
        email: 'hey@valaxin.dev',
        link: 'https://github.com/valaxin',
      },
    })

    for (const post of options.app.cache) {
      // create hash value for id
      const seed = `${post.stats.comments.creation}${post.stats.uri}`
      const salt = options.app.manifest.authors[0].name
      const hash = await createHmac('md5', salt).update(seed).digest('base64url')

      const item = {
        id: hash,
        title: post.stats.title,
        link: post.stats.uri,
        description: post.stats.comments.summary,
        content: post.content.html,
        date: new Date(post.stats.birthtime),
      }
      feed.addItem(item)
    }

    await writeFile(
      join(options.sys.folders.public, 'feed.json'),
      // Output: JSON Feed 1.0
      feed.json1(),
      'utf-8',
      (err) => {
        if (err) {
          return console.error(err)
        }
      }
    )

    await writeFile(
      join(options.sys.folders.public, 'feed.xml'),
      // Output: RSS 2.0
      feed.rss2(),
      'utf-8',
      (err) => {
        if (err) {
          return console.error(err)
        }
      }
    )
  } catch (ex) {
    throw ex
  }
}
