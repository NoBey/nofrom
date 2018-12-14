
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  externals: {
    'React': 'react'
  },
  module: {
    rules: [{
          test: /\.js(.*)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ['latest', 'stage-0', 'react']
          }
        }]
  },
  devServer: {
  contentBase: path.join(__dirname, "build"),
  compress: true,
  port: 9000
}
}
