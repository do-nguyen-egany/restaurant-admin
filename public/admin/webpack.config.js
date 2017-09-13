var path = require('path')
var webpack = require('webpack')

var config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: 'build.js'
    },
    module: {

        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
module.exports = config;