module.exports = function () {

    const fileSelectors = {
        allFonts: './src/assets/fonts/**/*',
        allLang: './src/assets/lang/**/*'
    };

    const sources = {
        dist: 'dist/lib/**/*.*',
        scss: [
            'src/lib/styles/styles.scss',
            'src/lib/styles/icons.scss',
            'src/lib/styles/themes/theme-loader.scss'
        ],
        readme: 'README.md'
    };

    const destinations = {
        tsOutputPath: './dist/lib/',
        fontsOutputPath: './dist/lib/assets/fonts/',
        langOutputPath: './dist/lib/assets/lang/',
        styles: './dist/lib/styles/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
    };

    return {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations
    };
};
