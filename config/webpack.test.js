const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
    mode: 'production',
    devtool: 'inline-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.html']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular'),
                    helpers.root('node_modules/mydatepicker')
                ]
            },
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
                exclude: [/\.e2e\.ts$/]
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
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: helpers.root('src'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    helpers.root('node_modules'),
                    helpers.root('src/app/assets'),
                    helpers.root('src/app/models'),
                    helpers.root('src/app/testing'),
                    helpers.root('src/app/translation')
                ]
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('./src'),
            {}
        ),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV),
                'HMR': false,
            }
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
        })
    ]
};

