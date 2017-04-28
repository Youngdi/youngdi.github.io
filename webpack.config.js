var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
  context: __dirname + '/js', // `__dirname` is root of project and `src` is source
  entry: {
    app: './lottery.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        use: [
          {
            /* webpack 2.x 移除了省略 -loader 的寫法 */
            loader: 'babel-loader',
            options: {
              presets: [
                /* Loose mode and No native modules(Tree Shaking) */
                ['es2015', 'react', { modules: false, loose: false }]
              ]
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;