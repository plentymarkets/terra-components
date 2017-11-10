const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const METADATA = {
    baseUrl: '/'
};

module.exports = function (options) {
    isProd = options.env === 'production';
    return {
        entry: {
            'bootstrap': 'bootstrap-loader',
            'polyfills': './src/polyfills.ts',
            'vendor': './src/vendor.ts',
            'app': './src/main.ts'
        },
        resolve: {
            descriptionFiles: ['package.json'],
            extensions: ['.ts', '.js', '.css', '.scss', 'json', '.html']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.css$/,
                    use: [
                        'to-string-loader',
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: [/\.glob\.scss$/],
                    loaders: [
                        'raw-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: helpers.root('src/app/assets/styles/_variables.scss')
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
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?mimetype=application/font-woff'
                },
                {
                    test: /\.(woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?mimetype=application/font-woff2'
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                },
                // Bootstrap 4
                {
                    test: /bootstrap\/dist\/js\/umd\//,
                    loader: 'imports-loader'
                }
            ]
        },
        plugins: [

            // Workaround for angular/angular#11580
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/,
                helpers.root('./src'), // location of your src
                {} // a map of your routes
            ),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills'],
                minChunks: Infinity
            }),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: true,
                metadata: METADATA
            }),

            new OccurrenceOrderPlugin(true),

            new ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                // Tether: "tether",
                // "window.Tether": "tether",
                Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
                Button: "exports-loader?Button!bootstrap/js/dist/button",
                Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
                Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
                Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
                Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
                Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
                Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
                Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
                Util: "exports-loader?Util!bootstrap/js/dist/util"
            }),

            new CopyWebpackPlugin([
                {from: 'src/app/assets', to: 'assets'}
            ]),

            new LoaderOptionsPlugin({
                debug: true,
                options: {
                    context: __dirname,
                    output: {path: './'},
                    postcss: [autoprefixer],
                    tslint: {
                        emitErrors: false,
                        failOnHint: false,
                        resourcePath: helpers.root('./src'),
                        formattersDirectory: "./node_modules/tslint-loader/formatters/"
                    }
                }
            })
        ],
        node: {
            global: true,
            process: true,
            Buffer: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false,
            clearTimeout: true,
            setTimeout: true
        }
    }
};
