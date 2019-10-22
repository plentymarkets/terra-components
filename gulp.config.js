module.exports = function () {

    const fileSelectors = {
        allFonts: './src/assets/fonts/**/*',
        allLang: './src/assets/lang/**/*'
    };

    const sources = {
        tslintRules: './tslint-rules.json',
        customLintRules: './lintRules/**/*Rule.ts',
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

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
    };

    return {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations
    };
};
