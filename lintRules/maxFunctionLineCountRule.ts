/* tslint:disable:max-classes-per-file */
import * as ts from 'typescript';
import * as Lint from 'tslint';
import { isFunctionWithBody } from 'tsutils';
import { isNullOrUndefined } from 'util';

interface MaxFunctionLineCountOptions
{
    maxLines:number;
}

export class Rule extends Lint.Rules.AbstractRule
{
    public apply(sourceFile:ts.SourceFile):Array<Lint.RuleFailure>
    {
        // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
        return this.applyWithWalker(new MaxFunctionLineCountRule(sourceFile, this.ruleName, {maxLines: this.ruleArguments[0] as number}));
    }
}

// The walker takes care of all the work.
class MaxFunctionLineCountRule extends Lint.AbstractWalker<MaxFunctionLineCountOptions>
{
    private knownLineCounts:Map<string, number> = new Map<string, number>();

    public walk(sourceFile:ts.SourceFile):void
    {
        const cb:(node:ts.Node) => void = (node:ts.Node):void =>
        {
            if(isFunctionWithBody(node))
            {
                this.checkFunction(node);
            }
            ts.forEachChild(node, cb);
        };

        ts.forEachChild(sourceFile, cb);
    }

    private checkFunction(node:ts.FunctionLikeDeclaration):void
    {
        const lines:number = this.checkLineCount(node.body);


        if(lines > this.options.maxLines)
        {
            this.addFailure(node.getStart(this.sourceFile), node.getWidth(), this.getFailureString(lines, this.options.maxLines));
        }
    }

    private checkLineCount(node:ts.Node):number
    {
        const nodeText:string = node.getText();
        let lineCount:number = 0;

        if(this.alreadyCounted(nodeText))
        {
            lineCount = this.getCount(nodeText);
        }
        else
        {
            lineCount = this.calculateLineCount(node);
            this.addCount(nodeText, lineCount);
        }

        return lineCount;
    }

    private alreadyCounted(key:string):boolean
    {
        return !isNullOrUndefined(this.knownLineCounts.get(key));
    }

    private getCount(key:string):number
    {
        return this.knownLineCounts.get(key);
    }

    private addCount(key:string, count:number):void
    {
        this.knownLineCounts.set(key, count);
    }

    private calculateLineCount(node:ts.Node):number
    {
        const firstNodeLine:number = ts.getLineAndCharacterOfPosition(this.sourceFile, node.getStart(this.sourceFile)).line;
        const lastNodeLine:number = ts.getLineAndCharacterOfPosition(this.sourceFile, node.end).line;
        const lineCount:number = lastNodeLine - firstNodeLine;

        return lineCount + 1;
    }

    private getFailureString(lineCount:number, lineLimit:number):string
    {
        return 'A function or method has ' + lineCount + ' lines. ' +
            'This exceeds the maximum of ' + lineLimit + ' lines.';
    }
}

/* tslint:enable:max-classes-per-file */
