module.exports = function () {
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
        styles: './dist/styles/',
        portletSchematicJson: './dist/schematics/ng-update/terra-portlet-migration',

        terra: '../terra/node_modules/@plentymarkets/terra-components/'
    };

    return {
        sources: sources,
        destinations: destinations
    };
};
