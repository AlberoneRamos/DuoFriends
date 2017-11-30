const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: ['./app/index'],
    output: {
        path: path.resolve('public'),
        filename: 'bundle.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(), //dedupe similar code 
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,   // enable source maps to map errors (stack traces) to modules
          output: {
            comments: false, // remove all comments
          },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
        new CompressionPlugin({ 
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
    ],

    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]},
                {
                  test: /\.css$/,
                  use: [
                    "style-loader",
                    {
                      loader: "css-loader",
                      options: {
                        modules: true,
                        sourceMap: true,
                        importLoaders: 1,
                        localIdentName: "[name]--[local]--[hash:base64:8]"
                      }
                    },
                    "postcss-loader" // has separate config, see postcss.config.js nearby
                  ]
                },
        ]
    }
}