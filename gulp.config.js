module.exports = function () {

    const fileSelectors = {
        allFonts: './src/assets/fonts/**/*',
        allLang: './src/assets/lang/**/*'
    };

    const sources = {
        floatThead: './src/lib/components/tables/data-table/float-thead/floatThead.js',
        dist: 'dist/**/*.*',
        scss: [
            'src/lib/styles/styles.scss',
            'src/lib/styles/icons.scss',
            'src/lib/styles/themes/theme-loader.scss'
        ],
        packageJson: 'src/lib/package.json',
        readme: 'README.md'
    };

    const destinations = {
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/assets/fonts/',
        langOutputPath: './dist/assets/lang/',
        floatThead: './dist/components/tables/data-table/float-thead/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
    };

    return {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations
    };
};
