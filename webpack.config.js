var path = require('path');
var webpack = require("webpack");

module.exports = {

  entry: ['babel-polyfill', "./app/index.js"],

  output: {
      path: path.join(__dirname, 'dist'),
      filename: "bundle.js"
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: "cheap-module-source-map",

  module: {
    loaders: [

      {
        test: /.js$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader'
      },

      {
        test: /.less$/,
        use: [
         {
           loader: "style-loader"
         },
         {
           loader: "css-loader",
           options: {
             minimize: true
           }
         },
         {
           loader: "less-loader"
         }
       ]
      }

    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]

};

if (process.env.NODE_ENV === 'production') {

  module.exports.plugins.push(
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      minimize: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
  )

}
