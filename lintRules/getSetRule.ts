/* tslint:disable:max-classes-per-file */
import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule
{
    public apply(sourceFile:ts.SourceFile):Array<Lint.RuleFailure>
    {
        return this.applyWithWalker(new GetSetRule(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class GetSetRule extends Lint.RuleWalker
{
    private knownGetter:Array<string> = [];
    private knownSetter:Array<string> = [];

    public visitSetAccessor(node:ts.AccessorDeclaration):void
    {
        let setterName:string = node.name.getFullText().trim();
        let regExp:RegExp = new RegExp('this\\._' + setterName + '[ \\t]*=[ \\t]*' + node.parameters[0].name.getFullText());

        if(node.body.statements.length === 1
           && node.body.statements[0].getFullText().trim().search(regExp) === 0)
        {
            if(this.knownGetter.indexOf(setterName) >= 0)
            {
                this.addFailureAt(
                    node.getStart(),
                    node.getWidth(),
                    'Simple setter of ' + setterName + '\n\tSimple getter still exist => Use public local field instead!!!'
                );
            }
            else
            {
                this.knownSetter.push(setterName);
            }
        }
    }

    public visitGetAccessor(node:ts.AccessorDeclaration):void
    {
        let getterName:string = node.name.getFullText().trim();
        let regExp:RegExp = new RegExp('return[ \\t]*this\\._' + getterName + '[ \\t]*;');

        if(node.body.statements.length === 1
           && node.body.statements[0].getFullText().trim().search(regExp) === 0)
        {
            if(this.knownSetter.indexOf(getterName) >= 0)
            {
                this.addFailureAt(
                    node.getStart(),
                    node.getWidth(),
                    'Simple getter ' + getterName + '\n\tSimple setter still exist=> Use public local field instead!!!'
                );
            }
            else
            {
                this.knownGetter.push(getterName);
            }
        }
    }
}
/* tslint:enable:max-classes-per-file */
