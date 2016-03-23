var webpack = require('webpack');
module.exports = function (opts) {
  return {
    entry: './src/index.js',
    output: {
      path: './dist',
      filename: 'appmanifest.min.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015-webpack']
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
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
      })
    ]
  };
}
