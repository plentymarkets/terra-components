module.exports = function () {

    var fileSelectors = {
        allTs: './src/lib/**/!(*.d).ts',
        allCSS: './src/lib/**/*.css',
        allSCSS: './src/lib/**/*.scss',
        allHTML: './src/lib/**/*.html',
        allFonts: './src/assets/fonts/**/*',
        allLang: './src/assets/lang/**/*'
    };

    var filesToCopy = [
        'package.json',
        'README.md',
        './src/lib/**/floatThead.js',
        fileSelectors.allCSS,
        fileSelectors.allSCSS,
        fileSelectors.allHTML
    ];

    var sources = {
        tslintRules: './tslint-rules.json',
        customLintRules: './lintRules/**/*Rule.ts',
        dist: 'dist/**/*.*'
    };

    var terraComponentsDocPath = '../terra-components-doc/node_modules/@plentymarkets/terra-components/';
    var destinations = {
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/assets/fonts/',
        langOutputPath: './dist/assets/lang/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
        terraComponentsDoc: terraComponentsDocPath,
        terraComponentsDocComponents: terraComponentsDocPath + 'app/components',
        terraComponentsDocBuild: terraComponentsDocPath + 'component-documentation/build'
    };


    var config = {
        filesToCopy: filesToCopy,
        fileSelectors: fileSelectors,
        sources: sources,
        destinations: destinations,
        excluded: '!./src/system-config.ts'
    };

    return config;
};
