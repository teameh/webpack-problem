const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/client.js'
  },

  output: {
    // The build folder.
    path: path.resolve(__dirname, '../dist/client/static'),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: { loader: 'style-loader', options: { sourceMap: true } },
          loader: { loader: 'css-loader', options: { sourceMap: true } },
        })
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|tiff)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]',
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['css', 'js', 'img', 'index.html'], {
      root: path.resolve(__dirname, '../dist/client/static'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: '!!handlebars-loader!customer/public/index.hbs'
    })
  ],

  // https://webpack.js.org/configuration/devtool/
  // 'eval' | 'cheap-eval-source-map' | 'cheap-module-eval-source-map' | 'eval-source-map'
  devtool: 'cheap-eval-source-map'
};
