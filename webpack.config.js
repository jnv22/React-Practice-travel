var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
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
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.jpg$/, loader: "url-loader?limit=10000&minetype=image/jpg" }

    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
};
