const path = require('path');

module.exports = {
// this is where we setup the default path for absolute path in other components.
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules'),
    ]
  },
  // here we set up where to get the data to bundle. Babel-polyfill is used for using advanced javascript features.
  entry: [ 'babel-polyfill', './lib/renderers/dom.js'],
  // output is where we send the bundle.
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
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
  }
};
