#! ./node_modules/.bin/webpack

'use strict'

import 'dotenv/config'
import { resolve } from 'path'
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin'
import { parseAllMarkdown } from './utils/parseMarkdown.js'
import JSONWebpackPlugin from './utils/JSONWebpackPlugin.js'

const mode = process.env.NODE_ENV === 'production' ? true : false
const markdownPosts = parseAllMarkdown(resolve('src/blog'), 'src/views/post.pug')

import { gumroad, github } from './utils/remoteCollections.js'

/* --- */

const devServer = {
  static: { directory: 'src/public' },
  devMiddleware: { publicPath: '/' },
  hot: true,
  compress: false,
}

/* --- */

const bundlerOptions = {
  experiments: {
    topLevelAwait: true,
  },
  preprocessor: 'pug',
  entry: {
    index: 'src/views/index.pug'
  },
  js: {
    filename: 'js/[name].[contenthash:8].js',
  },
  css: {
    filename: 'css/[name].[contenthash:8].css',
  },
  beforePreprocessor: (content, { data, resourcePath, _module }) => {},
  data: {
    self: {
      posts: markdownPosts,
      products: gumroad,
      repos: github,
      title: 'castle',
      theme: {
        color: '#FFFFFF',
      },
    },
  },
}

// add dynamically generated posts to bundle
for (let i = 0; i < markdownPosts.length; i++) {
  bundlerOptions.entry[markdownPosts[i].slug] = {
    import: markdownPosts[i].templatePath,
    data: { context: markdownPosts[i] }
  }
}

/* --- */

const config = {
  devtool: mode ? false : 'eval',
  devServer: mode ? false : devServer,
  mode: mode ? 'production' : 'development',
  entry: {},
  output: {
    path: resolve('dist'),
    filename: `bundle.[name].[chunkhash:8].js`,
  },
  resolve: {
    alias: {
      '@npm': resolve('node_modules'),
      '@images': resolve('src/images'),
      '@styles': resolve('src/styles'),
      '@scripts': resolve('src/scripts'),
    },
    extensions: ['.mjs', '.cjs', '.js', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|cjs)$/,
        include: resolve('src/scripts'),
        loader: 'babel-loader',
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[chunkhash:8][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fnt/[name].[chunkhash:8][ext][query]',
        },
      },
      {
        test: /\.s?css$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlBundlerPlugin(bundlerOptions),
    new JSONWebpackPlugin({ data: bundlerOptions.data })
  ]
}

export default config
