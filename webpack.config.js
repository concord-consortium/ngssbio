var path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/code/app.js'],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  }
};
