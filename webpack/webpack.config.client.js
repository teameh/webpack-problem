const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';

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
          loader: { loader: 'css-loader', options: { sourceMap: true } }
        })
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|tiff)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    // clean some paths
    new CleanWebpackPlugin(['css', 'js', 'img', 'index.html'], {
      root: path.resolve(__dirname, '../dist/client/static'),
      verbose: false
    }),
    // add index.html from hbs template
    new HtmlWebpackPlugin({
      template: '!!handlebars-loader!customer/public/index.hbs'
    }),
    // add new bundle with name 'externals
    new webpack.optimize.CommonsChunkPlugin({
      name: 'externals',
      minChunks: (module) => (
        // return true if module is from node_modules
        typeof module.userRequest === 'string' &&
        module.userRequest.indexOf('/node_modules/') >= 0
      )
    }),
    // extract css as text from js
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:8].css'
    })
  ],

  stats: {
    children: false,
  },

  // https://webpack.js.org/configuration/devtool/
  // 'eval' | 'cheap-eval-source-map' | 'cheap-module-eval-source-map' | 'eval-source-map'
  devtool: DEBUG ? 'cheap-eval-source-map' : ''
};
