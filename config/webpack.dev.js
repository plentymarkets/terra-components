const helpers = require('./helpers');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        port: 3001,
        historyApiFallback: true
    },
    plugins:[
        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets'}
        ])
    ]
});
