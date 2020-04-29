const path = require('path');

class ComponentGroup {
    constructor(name, id, deprecated) {
        this.name = name;
        this.id = id;
        this.aliases = [];
        this.docType = 'componentGroup';
        this.directives = [];
        this.services = [];
        this.additionalClasses = [];
        this.ngModule = null;
        this.myIsDeprecated = deprecated;
    }
}

class cDeprecated {
    constructor(isDeprecated, deprecatedText) {
        this.deprecated = deprecatedText;
        this.isDeprecated = isDeprecated;
    }
}

function createGroupNameByBaseName(baseName, stringToDelete) {
    for (var x = 0; x != stringToDelete.length; x++) {
        if (baseName.search(stringToDelete[x]) != -1) {
            baseName = baseName.replace(stringToDelete[x], '');
        }
    }
    return baseName;
}

module.exports = function componentGrouper() {
    return {
        $runBefore: ['docs-processed'],
        $process: function (docs) {
            // Map of group name to group instance.
            var groups = new Map();
            var stringDelete = [];

            docs.forEach(function (doc) {
                var group,
                    groupName = 'not-assigned';
                var test = doc.fileInfo.baseName;
                var name = doc.name;
                var deprecated;
                if (doc.isDeprecated) {
                    deprecated = new cDeprecated(true, doc.deprecated);
                }

                test = test.substring(0, test.indexOf('.'));

                if (doc.isDirective) {
                    groupName = './' + test + '/' + doc.directiveSelectors[0];
                } else if (doc.isService) {
                    groupName = './' + test + '/' + doc.fileInfo.baseName;
                } else if (doc.docType === 'class') {
                    groupName = './' + test + '/' + doc.fileInfo.baseName;
                }

                if (groups.has(groupName)) {
                    group = groups.get(groupName, name, deprecated);
                } else {
                    group = new ComponentGroup(groupName, name, deprecated);
                    groups.set(groupName, group);
                }

                if (doc.isDirective) {
                    group.directives.push(doc);
                } else if (doc.isService) {
                    group.services.push(doc);
                } else if (doc.docType === 'class') {
                    group.additionalClasses.push(doc);
                }
            });

            return Array.from(groups.values());
        }
    };
};
