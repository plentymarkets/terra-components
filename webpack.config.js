module.exports({
    entry: {
        'polyfills': './src/polyfills.ts',
        'main': './src/main.ts' // our angular app
    },
    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'] // <-- include .scss
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            // Support for CSS as raw text
            { test: /\.css$/, loader: 'raw-loader' },

            // support for .html as raw text
            { test: /\.html$/, loader: 'raw-loader', exclude: [ root('src/index.html') ] },

            // if you add a loader include the resolve file extension above

            { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },

            // { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        ]
    }
});