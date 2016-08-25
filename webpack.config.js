var path = require("path");
var webpack = require("webpack");
var webpackExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    debug: true,
    cache: false,
    entry: {
        jsCombo: path.join(__dirname, "frontend/jsx/main.js"),
        styleCombo: [path.join(__dirname, "node_modules/normalize.css/normalize.css"),
                     path.join(__dirname, "frontend/style.css")]
    },
    output: {
        path: path.join(__dirname, "public/"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/ ,
              loader: webpackExtractTextPlugin.extract("style-loader","css-loader")
            },
            { test: /.js?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react']
              }
            }
        ]
    },
    resolve: {},
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpackExtractTextPlugin("styleCombo.css", {allChunks: true})
    ]
};
