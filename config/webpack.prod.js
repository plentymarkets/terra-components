const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const TerserPlugin = require('terser-webpack-plugin');

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
            new TerserPlugin({
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
