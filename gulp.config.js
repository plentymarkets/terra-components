module.exports = function () {

  var config = {

    allTs: './src/**/*.ts',
    allCSS: './src/**/*.css',
    allSCSS: './src/**/*.scss',
    allHTML: './src/**/*.html',
    tsOutputPath: './dist/',
    excluded: '!./src/system-config.ts'

  };

  return config;
};
