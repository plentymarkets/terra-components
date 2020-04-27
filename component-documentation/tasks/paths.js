module.exports = {
  dgeniOutputPath: './component-documentation/build', // output dir where you want your dgeni generated files
  dataJsonOutputPath: './component-documentation/build/statham.json', // output dir where you want your json data file
  readDirForBuildData: './src/app/button', // your build dir to perform changes at dgeni generated files
  examplePathTemplate: 'node_modules/@plentymarkets/terra-components/app/', // your dest dir for example files
  examplePathTemplateSecond: '/example/',
  examplePathTemplateThird: '.component.example',
  componentGroup: 'terra-', // to indentify which interface to use
  apiPathTemplate: 'assets/docu/build/' // your dest dir for api files
};
