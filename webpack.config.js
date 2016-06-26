var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin ({
  template: __dirname +'/app/index.html',
  filename: 'index.html',
  inject: 'body'
})



module.exports =  {
  entry: [
    './app/index.jsx'
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, include: __dirname + '/app', loader: "babel"},
      {test: /\.jpg$/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      {test: /\.scss?$/, loaders: ['style', 'css', 'sass']},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/dist'
  },
  plugins: [
    HTMLWebpackPluginConfig
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
