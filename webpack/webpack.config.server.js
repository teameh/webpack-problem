const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    'server-render': './src/render.js',
  },

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    library: 'server',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|svg|png|jpg|jpeg|gif|tiff|woff|woff2|eot|ttf)$/,
        loader: 'ignore-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['server'], {
      root: path.resolve(__dirname, '../dist'),
      verbose: false
    })
  ],

  stats: {
    children: false
  },

  // 'eval' | 'cheap-eval-source-map' | 'cheap-module-eval-source-map' | 'eval-source-map'
  devtool: DEBUG ? 'cheap-eval-source-map' : ''
};
