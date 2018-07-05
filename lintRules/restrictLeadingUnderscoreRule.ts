/* tslint:disabble:max-classes-per-file */
import * as ts from 'typescript';
import * as Lint from 'tslint';
import { isNullOrUndefined } from 'util';
import set = Reflect.set;

export class Rule extends Lint.Rules.AbstractRule
{
    public apply(sourceFile:ts.SourceFile):Lint.RuleFailure[]
    {
        return this.applyWithWalker(new RestrictLeadingUnderscoreWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class RestrictLeadingUnderscoreWalker extends Lint.RuleWalker
{
    private underscoreProperties:Array<ts.NamedDeclaration> = [];
    private propertiesWithGetOrSet:Array<string> = [];

    public visitConstructorDeclaration(node:ts.ConstructorDeclaration):void
    {
        node.parameters.forEach((parameter:ts.ParameterDeclaration) =>
            {
                let propertyName:string = parameter.name.getFullText().trim();
                if(propertyName.startsWith('_'))
                {
                    this.underscoreProperties.push(parameter);
                }
            }
        );

        super.visitConstructorDeclaration(node);
    }

    public visitPropertyDeclaration(node:ts.PropertyDeclaration):void
    {
        let propertyName:string = node.name.getFullText().trim();

        if(propertyName.startsWith('_'))
        {
            this.underscoreProperties.push(node);
        }

        super.visitPropertyDeclaration(node);
    }

    public visitSetAccessor(node:ts.AccessorDeclaration):void
    {
        let setterName:string = '_' + node.name.getFullText().trim();
        this.propertiesWithGetOrSet.push(setterName);
    }

    public visitGetAccessor(node:ts.AccessorDeclaration):void
    {
        let getterName:string = '_' + node.name.getFullText().trim();
        this.propertiesWithGetOrSet.push(getterName);
    }

    public visitEndOfFileToken(node:ts.Node):void
    {
        this.propertiesWithGetOrSet.forEach((propertyName:string) =>
            {
                let index:number = this.underscoreProperties.findIndex((property:ts.NamedDeclaration) =>
                {
                    return property.name.getFullText().trim() === propertyName;
                });

                if(index >= 0)
                {
                    this.underscoreProperties.splice(index, 1);
                }
            }
        );

        this.underscoreProperties.forEach((parameter:ts.ParameterDeclaration) =>
        {
            let propertyName:string = parameter.name.getFullText().trim();

            this.addFailureFromStartToEnd(
                node.getStart(),
                node.getWidth(),
                'Property: ' + propertyName + ' --- Leading underscores are only needed if you have to use a get or set method for this field.'
            );
        });
    }
}

/* tslint:enable:max-classes-per-file */
