const fs = require('fs');

module.exports = {
    buildJsonFile: function (jsonFilePath) {
        var searchDirPath = './src/app/components';
        var directories = filterArray(searchDirPath);
        var dirLength = directories.length - 1;
        var excludedFileType = ['interface', 'config'];

        fs.closeSync(fs.openSync(jsonFilePath, 'w'));
        fs.appendFileSync(jsonFilePath, '[');

        for (var i = 0; i < directories.length; i++) {
            var exampleMetaData = findExamplePath(directories[i], '', 'example', null);
            var searchName = exampleMetaData[0].substring(exampleMetaData[0].lastIndexOf('/') + 1);
            var selector = searchName.substring(0, searchName.indexOf('.'));
            var apiExamplePath = findExamplePath('./component-documentation/build', '', selector, excludedFileType);
            var componentGroup = exampleMetaData[0].replace(searchDirPath + '/', '');
            componentGroup = componentGroup.substring(0, componentGroup.indexOf('/'));
            exampleMetaData['apiPath'] = apiExamplePath[0];
            exampleMetaData['componentSelector'] = selector;
            exampleMetaData['exampleSelector'] = selector + '-example';
            exampleMetaData['componentGroup'] = componentGroup;
            fs.appendFileSync(jsonFilePath, JsonDataTemplate(exampleMetaData));

            if (i < dirLength) {
                fs.appendFileSync(jsonFilePath, ',');
            }
        }

        fs.appendFileSync(jsonFilePath, ']');
    }
};

function findExamplePath(dir, file, filter, exclude) {
    file = [];
    var files = fs.readdirSync(dir);
    var excludeError = false;
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            var examples = findExamplePath(name, file, filter, exclude);
            if (examples.length !== 0) {
                for (var i = 0; i < examples.length; i++) {
                    file.push(examples[i]);
                }
            }
        } else if (name.includes(filter)) {
            // exclude js and d.ts files
            if (!name.includes('.d.ts') && !name.includes('.js')) {
                if (exclude !== null) {
                    for (var x = 0; x < exclude.length; x++) {
                        if (name.includes(exclude[x])) {
                            excludeError = true;
                        }
                    }
                    if (excludeError === false) {
                        file.push(name);
                    }
                    excludeError = false;
                } else file.push(name);
            }
        }
    }
    return file;
}

function filterArray(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat.isDirectory()) results = results.concat(filterArray(file));
        else if (dir.includes('example')) results = dir;
    });
    return results;
}

function JsonDataTemplate(array) {
    var writeData;

    for (var i in array) {
        if (array[i] !== undefined) {
            array[i] = array[i].replace('./src', '');
            array[i] = array[i].replace('./', '');
        }
    }

    writeData =
        '\r\n\t{' +
        buildJsonRow('name', array['componentSelector']) +
        buildJsonRow('ExampleSelector', '<' + array['exampleSelector'] + '></' + array['exampleSelector'] + '>') +
        buildJsonRow('pathExampleHtml', array[0]);

    if (array.length === 4) {
        writeData +=
            buildJsonRow('pathExampleCss', array[2]) +
            buildJsonRow('pathExampleTs', array[3]) +
            buildJsonRow('pathOverview', array[1]);
    } else {
        writeData += buildJsonRow('pathExampleCss', array[1]) + buildJsonRow('pathExampleTs', array[2]);
    }

    writeData +=
        buildJsonRow('componentGroup', array['componentGroup']) +
        buildJsonRow('path', array['apiPath'], true) +
        '\r\n\t}';

    return writeData;
}

function buildJsonRow(entryName, entryValue, isLastRow) {
    var row = '';
    row += '\r\n\t\t"' + entryName + '":"' + entryValue + '"';

    if (!isLastRow) {
        row += ',';
    }

    return row;
}
