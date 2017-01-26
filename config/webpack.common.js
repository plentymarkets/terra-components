const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            {
                                loader: 'css-loader',
                                query: {
                                    modules: false,
                                    sourceMap: false,
                                    localIdentName: '[hash:base64:5]',
                                    minimize: false
                                }
                            },
                            'postcss-loader',
                            {
                                loader: 'sass-loader',
                                query: {
                                    sourceMap: false
                                }
                            },
                            'sass-resources-loader'
                        ]
                    })
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
            new ForkCheckerPlugin(),

            new CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills'],
                minChunks: Infinity
            }),

            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('./src') // location of your src
            ),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: true,
                metadata: METADATA
            }),

            new OccurrenceOrderPlugin(true),

            new ProvidePlugin({
                // jQuery: 'jquery',
                // jquery: 'jquery',
                // $: 'jquery',
                // "Tether": 'tether',
                // "window.Tether": "tether",
                //---------------------------------------------------
                //------------- temporary workaround ----------------
                // https://github.com/shakacode/bootstrap-loader/issues/172#issuecomment-247205500
                //this requires exports-loader installed from npm
                Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
                Alert: "exports?Alert!bootstrap/js/dist/alert",
                Button: "exports?Button!bootstrap/js/dist/button",
                Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
                Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
                Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
                Modal: "exports?Modal!bootstrap/js/dist/modal",
                Popover: "exports?Popover!bootstrap/js/dist/popover",
                Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
                Tab: "exports?Tab!bootstrap/js/dist/tab",
                Util: "exports?Util!bootstrap/js/dist/util"
                //---------------------------------------------------
            }),

            new ExtractTextPlugin("[name].css"),

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
                    },
                    sassResources: [
                        helpers.root('src/app/assets/styles/_variables.scss').toString()
                    ]
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
