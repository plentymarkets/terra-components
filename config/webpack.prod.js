var merge = require('webpack-merge');
var commonConfig = require('./webpack.common');
var helpers = require('./helpers');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true
            })
        ],
        splitChunks: {
            // chunks: 'all'
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
});
