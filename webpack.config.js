const webpack = require('webpack');

const minify = new webpack.optimize.UglifyJsPlugin({
  comments: false,
  compress: {
    warnings: false,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    screw_ie8: true,
    properties: true
  }
});

const defn = new webpack.DefinePlugin({
  "process.env": JSON.stringify("production")
});

module.exports = {
  entry: './src/index.js',
  output: {
    pathinfo: true,
    path: './dist',
    filename: 'appmanifest.min.js',
    library: 'AppManifest',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        // not yet because some node_modules are ES6
        // and UglifyJs doesn't support ES6 yet
        // exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          compact: false
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    defn,
    minify
  ]
};
