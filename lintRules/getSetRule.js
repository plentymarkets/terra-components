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
        return this.applyWithWalker(new GetSetRule(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var GetSetRule = (function (_super) {
    tslib_1.__extends(GetSetRule, _super);
    function GetSetRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.knownGetter = [];
        _this.knownSetter = [];
        return _this;
    }
    GetSetRule.prototype.visitSetAccessor = function (node) {
        var setterName = node.name.getFullText().trim();
        var regExp = new RegExp('this\\._' + setterName + '[ \\t]*=[ \\t]*' + node.parameters[0].name.getFullText());
        if (node.body.statements.length === 1
            && node.body.statements[0].getFullText().trim().search(regExp) === 0) {
            if (this.knownGetter.indexOf(setterName) >= 0) {
                this.addFailureAt(node.getStart(), node.getWidth(), 'Simple setter of ' + setterName + '\n\tSimple getter still exist => Use public local field instead!!!');
            }
            else {
                this.knownSetter.push(setterName);
            }
        }
    };
    GetSetRule.prototype.visitGetAccessor = function (node) {
        var getterName = node.name.getFullText().trim();
        var regExp = new RegExp('return[ \\t]*this\\._' + getterName + '[ \\t]*;');
        if (node.body.statements.length === 1
            && node.body.statements[0].getFullText().trim().search(regExp) === 0) {
            if (this.knownSetter.indexOf(getterName) >= 0) {
                this.addFailureAt(node.getStart(), node.getWidth(), 'Simple getter ' + getterName + '\n\tSimple setter still exist=> Use public local field instead!!!');
            }
            else {
                this.knownGetter.push(getterName);
            }
        }
    };
    return GetSetRule;
}(Lint.RuleWalker));
