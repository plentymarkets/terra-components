module.exports = function () {
    const fileSelectors = {
        allLang: './src/assets/lang/**/*'
    };

    const sources = {
        dist: 'dist/**/*.*',
        scss: [
            'src/lib/styles/styles.scss',
            'src/lib/styles/function-groups.scss',
            'src/lib/styles/themes/theme-loader.scss'
        ],
        readme: 'README.md'
    };

    const destinations = {
        tsOutputPath: './dist/',
        langOutputPath: './dist/assets/lang/',
        styles: './dist/styles/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/'
    };

    return {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations
    };
};
