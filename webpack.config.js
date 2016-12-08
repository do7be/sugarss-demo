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
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.sss/,
        loaders: ['style', 'css?modules', 'postcss?parser=sugarss'],
        //loader: "style-loader!css-loader!postcss-loader?parser=sugarss"
      },
    ]
  },
  node: {
    fs: "empty"
  }
};
