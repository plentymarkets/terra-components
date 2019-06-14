"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Lint = require("tslint");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new RestrictLeadingUnderscoreWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var RestrictLeadingUnderscoreWalker = (function (_super) {
    tslib_1.__extends(RestrictLeadingUnderscoreWalker, _super);
    function RestrictLeadingUnderscoreWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.underscoreProperties = [];
        _this.propertiesWithGetOrSet = [];
        return _this;
    }
    RestrictLeadingUnderscoreWalker.prototype.visitConstructorDeclaration = function (node) {
        var _this = this;
        node.parameters.forEach(function (parameter) {
            var propertyName = parameter.name.getFullText().trim();
            if (propertyName.startsWith('_')) {
                _this.underscoreProperties.push(parameter);
            }
        });
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    RestrictLeadingUnderscoreWalker.prototype.visitPropertyDeclaration = function (node) {
        var propertyName = node.name.getFullText().trim();
        if (propertyName.startsWith('_')) {
            this.underscoreProperties.push(node);
        }
        _super.prototype.visitPropertyDeclaration.call(this, node);
    };
    RestrictLeadingUnderscoreWalker.prototype.visitSetAccessor = function (node) {
        var setterName = '_' + node.name.getFullText().trim();
        this.propertiesWithGetOrSet.push(setterName);
    };
    RestrictLeadingUnderscoreWalker.prototype.visitGetAccessor = function (node) {
        var getterName = '_' + node.name.getFullText().trim();
        this.propertiesWithGetOrSet.push(getterName);
    };
    RestrictLeadingUnderscoreWalker.prototype.visitEndOfFileToken = function (node) {
        var _this = this;
        this.propertiesWithGetOrSet.forEach(function (propertyName) {
            var index = _this.underscoreProperties.findIndex(function (property) {
                return property.name.getFullText().trim() === propertyName;
            });
            if (index >= 0) {
                _this.underscoreProperties.splice(index, 1);
            }
        });
        this.underscoreProperties.forEach(function (parameter) {
            var propertyName = parameter.name.getFullText().trim();
            _this.addFailureFromStartToEnd(node.getStart(), node.getWidth(), 'Property: ' + propertyName + ' --- Leading underscores are only needed if you have to use a get or set method for this field.');
        });
    };
    return RestrictLeadingUnderscoreWalker;
}(Lint.RuleWalker));
