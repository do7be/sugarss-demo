const autoprefixer = require('autoprefixer')

module.exports = {
  context: __dirname + '/src',
  entry: {
    'index': './',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query:{
          presets: ['react', 'latest']
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.sss/,
        loaders: ['style', 'css?modules', 'postcss?parser=sugarss'],
      },
    ]
  },
  postcss: [ autoprefixer() ],
  node: {
    fs: "empty"
  }
};
