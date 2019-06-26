const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    },
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {system: true}  // enable SystemJS
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [helpers.root('src/index.html')]
            },
            {
                test: /\.scss$/,
                exclude: [/\.glob\.scss$/],
                loaders: [
                    'raw-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        query: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: helpers.root('src/app/styles/_variables.scss')
                        }
                    }
                ]
            },
            {
                test: /\.glob\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]"
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            helpers.root('./src'),
            {}
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.Tether": 'tether'
        }),
        new CopyWebpackPlugin([
            {from: 'src/app/assets/lang', to: 'assets/lang'}
        ]),
        new ForkTsCheckerWebpackPlugin()
    ]
};
