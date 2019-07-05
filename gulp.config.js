module.exports = function () {

    var fileSelectors = {
        allTs: './src/lib/**/!(*.d).ts',
        allCSS: './src/lib/**/*.css',
        allSCSS: './src/lib/**/*.scss',
        allHTML: './src/lib/**/*.html',
        allFonts: './src/assets/fonts/**/*',
        allLang: './src/assets/lang/**/*'
    };

    var sources = {
        tslintRules: './tslint-rules.json',
        customLintRules : './lintRules/**/*Rule.ts',
        dist: 'dist/**/*.*'
    };

    var terraComponentsDocPath = '../terra-components-doc/node_modules/@plentymarkets/terra-components/';
    var destinations = {
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/assets/fonts/',
        langOutputPath: './dist/assets/lang/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
        terraBasePlugin: '../plugin-terra-basic/node_modules/@plentymarkets/terra-components/',
        terraComponentsDoc: terraComponentsDocPath,
        terraComponentsDocComponents: terraComponentsDocPath + 'app/components',
        terraComponentsDocBuild: terraComponentsDocPath + 'component-documentation/build'
    };


    var config = {
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations,
        excluded: '!./src/system-config.ts'
    };

    return config;
};
