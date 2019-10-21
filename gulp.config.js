module.exports = function () {

    var fileSelectors = {
        allFonts: './src/assets/fonts/**/*',
        allLang: './src/assets/lang/**/*'
    };

    var sources = {
        tslintRules: './tslint-rules.json',
        customLintRules: './lintRules/**/*Rule.ts',
        dist: 'dist/**/*.*',
        scss: [
            'src/lib/styles/styles.scss',
            'src/lib/styles/icons.scss',
            'src/lib/styles/themes/theme-loader.scss'
        ]
    };

    var destinations = {
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/assets/fonts/',
        langOutputPath: './dist/assets/lang/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
    };

    return {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations,
        scssSources: sources.scss
    };
};
