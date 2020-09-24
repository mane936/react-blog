const path = require('path');
const webpack = require('webpack');

module.exports = {
// this is where we setup the default path for absolute path in other components.
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules'),
    ]
  },
  // here we set up where to get the data to bundle. Babel-polyfill is used for using advanced javascript features.
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'prop-types',
      'axios',
      'lodash.debounce',
      'lodash.pickby',
    ],
    app: ['./lib/renderers/dom.js'],
  },

  // output is where we send the bundle.
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  // here we set up which kind of files we like to bundle.
  //Also we need to setup to exclude node_modules so we don't delay much when bundling
  // In this case we're using babel loader for copiling the javascript.
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  //we need Commons-chunk-plugin to Webpack to separate bundles
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    })
  ]
};
