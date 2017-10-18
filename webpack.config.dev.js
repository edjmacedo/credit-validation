
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    root: [path.resolve('./src')]
  },
  entry: {
    app: ['./src/shell.js'],
    vendors: ['react', 'react-dom']
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },

      {
      test: /\.properties$/,
      loader: 'file-loader?name=[name].[ext]',
      },

      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass', { publicPath: './'})
      },

      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css", {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new CopyWebpackPlugin(
      [
        { from: 'src/index.html' },
      ]
    )
  ],
  devServer: {
    hot: true
  },
  devtool: '#source-map'
}
