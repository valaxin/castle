#! ./node_modules/.bin/webpack

'use strict'

import { join, resolve } from 'node:path'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import options from './library/options-generator.js'

const productionFlag = options.mode === 'development' ? false : true
const localPugLoader = './library/pug-html-loader.js'

const devServer = {
  static: {
    directory: options.sys.folders.public,
  },
  devMiddleware: {
    publicPath: '/',
  },
  hot: !productionFlag,
  compress: false,
  host: options.server.host,
  port: options.server.port,
  proxy: [
    {
      context: ['/.netlify/functions'],
      target: 'http://localhost:9000',
      secure: false,
      pathRewrite: { '^/.netlify/functions': '' },
    },
  ],
}

const assetsize_mb = (1024000 * 2.5)

export default {
  mode: productionFlag ? 'production' : 'development',
  devServer,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: productionFlag ? false : 'warning',
    maxEntrypointSize: assetsize_mb,
    maxAssetSize: assetsize_mb
  },
  entry: {
    index: {
      import: resolve(options.entry.directory, options.entry.filename),
    },
  },
  output: {
    path: resolve(options.output.directory),
    filename: `[name].${options.output.filename}`,
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
          productionFlag === true ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
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
            loader: localPugLoader,
            options: {
              data: options.app,
            },
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
          from: options.sys.folders.public,
          to: './',
        },
      ],
    }),
    ...options.app.pages,
    ...options.app.posts,
  ],
  resolve: {
    modules: [join(options.entry.base, 'node_modules'), 'node_modules'],
    alias: {
      '@global' : join(options.entry.base, 'node_modules'),
      '@local'  : join(options.entry.base, 'app/modules'),
      '@library': join(options.entry.base, 'library'),
      '@styles' : options.sys.folders.styles,
    },
    extensions: ['.mjs', '.js', '.scss', '.sass', '.css', '.pug', '.html', '.png', '.webp', '.gif', '.svg'],
  },
}
