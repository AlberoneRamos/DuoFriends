const path = require('path');


module.exports = {
    entry: ['./app/index'],
    output:{
        path: path.resolve('public'),
        filename: 'bundle.js'
    },
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
    },
    devServer:{
        historyApiFallback: true
    }
}