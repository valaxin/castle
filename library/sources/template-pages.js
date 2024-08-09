/**
 * responsable for ingesting pug templates
 *
 * given a directory path string, (ex: ...path/to/views/)
 * this method will check it's contents up to one level folder deep for '.pug' files.
 * each discovered file is then provided to the 'HTMLWebpackPlugin' for consumption.
 * the result will be an array of these plugin objects.
 * ... merge this array with the 'build.plugin' array in our 'webpack.config.js' for use.
 */

'use strict'

import 'dotenv/config'
import { readdir } from 'fs/promises'
import { join } from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

/**
 * @param {String } directory ex: app/views/pages/index.pug
 * @returns array of HTMLWebpackPlugin objects [HTMLWebpackPlugin, ...]
 */

export default async function (directory) {
  const files = []

  const folder = await readdir(directory, {
    recursive: false,
    withFileTypes: true,
  })

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
