const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
        entry: {
            'polyfills': './src/polyfills.ts',
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
                        'raw-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader?name=assets/[name].[hash].[ext]'
                }
            ]
        },
        plugins: [
            new webpack.ContextReplacementPlugin(
                /\@angular(\\|\/)core(\\|\/)esm5/,
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
                "window.Tether": 'tether',
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
            ])
        ]
};
