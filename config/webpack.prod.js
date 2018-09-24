const helpers = require('./helpers');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

module.exports = function (env) {
    return webpackMerge(commonConfig({env: ENV}), {

        devtool: 'source-map',

        output: {
            path: helpers.root('dist'),
            filename: '[name].js',
            chunkFilename: '[id].[hash].chunk.js'
        },

        plugins: [

            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR
                }
            }),

            new UglifyJsPlugin({
                beautify: false,
                compress: {
                    screw_ie8: true
                },
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                comments: false
            }),

            new CompressionPlugin({
                regExp: /\.css$|\.html$|\.js$|\.map$/,
                threshold: 2 * 1024
            }),

            new webpack.LoaderOptionsPlugin({
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            })

        ]

    });
};
