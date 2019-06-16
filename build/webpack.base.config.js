const path = require('path')
const webpack = require('webpack');

// 模板注入
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 样式抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HappyPack = require('happypack');
const os = require('os');
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: [
    path.join(__dirname, '../', 'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, '../', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            // loader: 'babel-loader'
            loader: 'happypack/loader?id=babelconfig'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 创建style标签，并将css添加进去
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/',
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000,
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../', 'template', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery', // npm
    }),
    new HappyPack({
      id: 'babelconfig',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: HappyThreadPool
    })
  ]
}