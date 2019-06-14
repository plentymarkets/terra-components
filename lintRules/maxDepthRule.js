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
        return this.applyWithWalker(new MaxDepthWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MaxDepthWalker = (function (_super) {
    tslib_1.__extends(MaxDepthWalker, _super);
    function MaxDepthWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.currentDepth = 0;
        var option = options.ruleArguments[0];
        if (typeof option === 'number') {
            _this.maxDepth = option;
        }
        else {
            _this.maxDepth = 4;
        }
        return _this;
    }
    MaxDepthWalker.prototype.visitBlock = function (node) {
        this.currentDepth++;
        if (this.currentDepth > this.maxDepth) {
            this.addFailureFromStartToEnd(node.getStart(), node.getWidth(), 'Nesting-level of current block: ' + this.currentDepth + '. Maximum nesting level of blocks is ' + this.maxDepth);
        }
        _super.prototype.visitBlock.call(this, node);
        this.currentDepth--;
    };
    return MaxDepthWalker;
}(Lint.RuleWalker));
