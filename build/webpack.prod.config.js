const webpack = require('webpack');
const path = require('path')
const baseConfig = require('./webpack.base.config');
// 清除编译文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// css tree shaking
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

// PWA
const WorkboxPlugin = require('workbox-webpack-plugin')

const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map', // product
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    usedExports: true // js tree shaking
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PurifyCSS({
      paths: glob.sync([
        path.resolve(__dirname, '../', './src/*.html'),
        path.resolve(__dirname,  '../', './src/*.js')
      ])
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new webpack.DefinePlugin({
      'process': {
        env: JSON.stringify('production'),
        base_url: JSON.stringify('http://localhost:9002')
      }
    })
  ],
})