/* generate-build-version.js */

const fs = require('fs');
const chalk = require('chalk');

const packageJson = require('../package.json');
const manifestJson = require('../public/manifest.json');

const appVersion = packageJson.version;

const jsonData = {
  ...manifestJson,
  version: appVersion,
};

const jsonContent = JSON.stringify(jsonData, null, 2);

fs.writeFile('./public/manifest.json', jsonContent, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to manifest.json');
    return console.log(err);
  }

  console.log(`manifest.json file has been saved with latest version number - ${chalk.green(appVersion)}`);
});
