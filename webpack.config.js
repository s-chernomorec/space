var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  context: path.join(__dirname, 'src', 'js'),
  entry: {
    app:  './main.js'
  },
  output: {
    path: path.join(__dirname, 'dis'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      output: {
        comments: false,
      },
    })
  ]
};
