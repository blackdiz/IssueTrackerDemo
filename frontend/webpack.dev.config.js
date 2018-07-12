'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devtool: 'eval-source-map',
  entry: {
    index: ['babel-polyfill', './public/index/index.js']
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './public/template.html',
      filename: 'index.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new CleanWebpackPlugin(['dist/*']),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('http://issue-tracker-demo.com:3000')
    })
  ],
  serve: {
    content: path.join(__dirname, 'dist'),
    logTime: true,
    hot: true,
    host: 'issue-tracker-demo.com',
    add: (app, middleware) => {
      middleware.webpack();
      app.use(convert(history()));
    }
  }
};
