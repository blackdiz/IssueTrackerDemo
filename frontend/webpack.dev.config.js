'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('http://localhost:3000')
    })
  ],
  serve: {
    content: path.join(__dirname, 'dist'),
    logTime: true,
    hot: true,
    host: 'localhost',
    add: (app, middleware) => {
      middleware.webpack();
      app.use(convert(history()));
    }
  }
});
