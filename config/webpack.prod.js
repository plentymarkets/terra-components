const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');
const TerserPlugin = require('terser-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
    ]
});
