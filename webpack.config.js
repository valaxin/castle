#! ./node_modules/.bin/webpack

'use strict'

import 'dotenv/config'
import { resolve } from 'path'
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin'

const mode = process.env.NODE_ENV === 'production' ? true : false

/* --- */

const devServer = {
  static: { directory: 'src/public' },
  devMiddleware: { publicPath: '/' },
  hot: true,
  compress: false,
  proxy: [],
}

/* --- */

export default {
  devtool: mode ? false : 'eval',
  devServer: mode ? false : devServer,
  mode: mode ? 'production' : 'development',
  entry: {
    index: {
      import: './src/index.js',
    },
  },
  output: {
    path: resolve('dist'),
    filename: `bundle.[name].[hash:8].js`,
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
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fnt/[name].[hash:8][ext][query]',
        },
      },
      {
        test: /\.s?css$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlBundlerPlugin({
      preprocessor: 'pug',
      entry: {
        index: 'src/views/index.pug',
      },
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'css/[name].[contenthash:8].css',
      },
      data: {
        self: {
          title: 'castle',
          theme: {
            color: '#FFFFFF',
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@images': resolve('src/images'),
      '@styles': resolve('src/styles'),
      '@scripts': resolve('src/scripts'),
    },
    extensions: ['.mjs', '.cjs', '.js', '.scss', '.css'],
  },
}
