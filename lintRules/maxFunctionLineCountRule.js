"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts = require("typescript");
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var util_1 = require("util");
var Rule = (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxFunctionLineCountRule(sourceFile, this.ruleName, { maxLines: this.ruleArguments[0] }));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MaxFunctionLineCountRule = (function (_super) {
    tslib_1.__extends(MaxFunctionLineCountRule, _super);
    function MaxFunctionLineCountRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.knownLineCounts = new Map();
        return _this;
    }
    MaxFunctionLineCountRule.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils_1.isFunctionWithBody(node)) {
                _this.checkFunction(node);
            }
            ts.forEachChild(node, cb);
        };
        ts.forEachChild(sourceFile, cb);
    };
    MaxFunctionLineCountRule.prototype.checkFunction = function (node) {
        var lines = this.checkLineCount(node.body);
        if (lines > this.options.maxLines) {
            this.addFailure(node.getStart(this.sourceFile), node.getWidth(), this.getFailureString(lines, this.options.maxLines));
        }
    };
    MaxFunctionLineCountRule.prototype.checkLineCount = function (node) {
        var nodeText = node.getText();
        var lineCount = 0;
        if (this.alreadyCounted(nodeText)) {
            lineCount = this.getCount(nodeText);
        }
        else {
            lineCount = this.calculateLineCount(node);
            this.addCount(nodeText, lineCount);
        }
        return lineCount;
    };
    MaxFunctionLineCountRule.prototype.alreadyCounted = function (key) {
        return !util_1.isNullOrUndefined(this.knownLineCounts.get(key));
    };
    MaxFunctionLineCountRule.prototype.getCount = function (key) {
        return this.knownLineCounts.get(key);
    };
    MaxFunctionLineCountRule.prototype.addCount = function (key, count) {
        this.knownLineCounts.set(key, count);
    };
    MaxFunctionLineCountRule.prototype.calculateLineCount = function (node) {
        var firstNodeLine = ts.getLineAndCharacterOfPosition(this.sourceFile, node.getStart(this.sourceFile)).line;
        var lastNodeLine = ts.getLineAndCharacterOfPosition(this.sourceFile, node.end).line;
        var lineCount = lastNodeLine - firstNodeLine;
        return lineCount + 1;
    };
    MaxFunctionLineCountRule.prototype.getFailureString = function (lineCount, lineLimit) {
        return 'A function or method has ' + lineCount + ' lines. ' +
            'This exceeds the maximum of ' + lineLimit + ' lines.';
    };
    return MaxFunctionLineCountRule;
}(Lint.AbstractWalker));
