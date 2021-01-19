module.exports = function () {
    const fileSelectors = {
        allFonts: './src/assets/fonts/**/*'
    };

    const sources = {
        dist: 'dist/**/*.*',
        scss: ['src/lib/styles/styles.scss', 'src/lib/styles/icons.scss', 'src/lib/styles/themes/theme-loader.scss'],
        readme: 'README.md'
    };

    const destinations = {
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/assets/fonts/',
        styles: './dist/styles/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/'
    };

    return {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations
    };
};
