module.exports = function () {

    var fileSelectors = {
        allTs: './src/**/!(*.d).ts',
        allCSS: './src/**/*.css',
        allFonts: './src/app/assets/fonts/**/*',
        allImages: './src/app/assets/images/**/*',
        allSCSS: './src/**/*.scss',
        allHTML: './src/**/*.html',
        allLang: './src/app/assets/lang/**/*'
    };

    var sources = {
        tslintRules: './tslint-rules.json',
        dist: 'dist/**/*.*'
    };

    var terraComponentsDocPath = '../terra-components-doc/node_modules/@plentymarkets/terra-components/';
    var destinations = {
        tsOutputPath: './dist/',
        fontsOutputPath: './dist/app/assets/fonts/',
        imagesOutputPath: './dist/app/assets/images/',
        langOutputPath: './dist/app/assets/lang/',

        terra: '../terra/node_modules/@plentymarkets/terra-components/',
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
