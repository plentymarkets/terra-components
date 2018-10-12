var helpers = require('./helpers');
var merge = require('webpack-merge');
var commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        port: 3001,
        historyApiFallback: true,
        stats: {
            warningsFilter: /System.import/ // https://github.com/angular/angular/issues/21560
        }
    }
});
