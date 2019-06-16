const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // dev
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '../', 'dist'),
    host: '127.0.0.1',
    port: 8080,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端api地址
      '/api': 'http://localhost:9000'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process': {
        env: JSON.stringify('development'),
        base_url: JSON.stringify('http://localhost:9001')
      }
    })
  ]
})