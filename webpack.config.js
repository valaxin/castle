#! ./node_modules/.bin/webpack

'use strict'

import { join, resolve } from 'node:path'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import options from './support/prebuild.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const mode = options.defaults.mode === 'production' ? true : false

const devServer = {
  static: { directory: 'src/public' },
  devMiddleware: { publicPath: '/' },
  hot: true,
  compress: false,
  proxy: [],
}

export default {
  devServer: mode ? {} : devServer,
  mode: options.defaults.mode,
  stats: 'errors-only',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: mode ? false : 'warning',
    maxEntrypointSize: 1024000 * 2.5,
    maxAssetSize: 1024000 * 2.5
  },
  entry: {
    index: {
      import: resolve(options.defaults.entry.directory, options.defaults.entry.filename),
    },
  },
  output: {
    path: resolve(options.defaults.output.directory),
    filename: `[name].${options.defaults.output.filename}`,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|ts|tsx)$/,
        include: resolve(process.cwd(), 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(s(a|c)ss|css)$/,
        use: [
          mode !== true ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'global',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              api: 'modern',
              sassOptions: {
                quietDeps: true,
                charset: false,
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: './support/pug-html-loader.js',
            options: { data: options.pdata },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve('src/public'),
          to: './',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: '/src/views/pages/index.pug',
      filename: 'index.html'
    }),
    ...options.defaults.app.blog.pluginInstances
  ],
  resolve: {
    modules: [ resolve('node_modules') ],
    alias: {
      '@npm': resolve('node_modules'),
      '@web': resolve('src/javascript'),
      '@css': resolve('src/styles'),
      '@lib': resolve('support'),
    },
    extensions: [
      '.mjs', '.js', '.scss', '.css', '.pug'
    ],
  },
}
