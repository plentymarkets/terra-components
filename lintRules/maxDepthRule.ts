/* tslint:disable:max-classes-per-file */
import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule
{
    public apply(sourceFile:ts.SourceFile):Array<Lint.RuleFailure>
    {
        return this.applyWithWalker(new MaxDepthWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class MaxDepthWalker extends Lint.RuleWalker
{
    private maxDepth:number;
    private currentDepth:number = 0;

    constructor(sourceFile:ts.SourceFile, options:Lint.IOptions)
    {
        super(sourceFile, options);

        let option:any = options.ruleArguments[0];

        if(typeof option === 'number')
        {
            this.maxDepth = option;
        }
        else
        {
            this.maxDepth = 4;
        }
    }

    public visitBlock(node:ts.Block):void
    {
        this.currentDepth++;

        if(this.currentDepth > this.maxDepth)
        {
            this.addFailureFromStartToEnd(
                node.getStart(),
                node.getWidth(),
                'Nesting-level of current block: ' + this.currentDepth + '. Maximum nesting level of blocks is ' + this.maxDepth
            );
        }

        super.visitBlock(node);

        this.currentDepth--;
    }
}

/* tslint:enable:max-classes-per-file */
