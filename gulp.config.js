module.exports = function () {

  var config = {

    allTs: './src/**/*.ts',
    tsOutputPath: './src/',
    excluded: '!./src/system-config.ts'

  };

  return config;
};
