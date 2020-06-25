import {
    Rule,
    SchematicContext,
    Tree,
    UpdateRecorder
} from '@angular-devkit/schematics';
import { from } from 'rxjs';
import { LoggerApi } from '@angular-devkit/core/src/logger';

const componentPath:string = 'hello.component.ts';

const queryString:string = 'Foobar!';
const replaceString:string = 'Foo Bar!!';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function checkboxMigration(_options:any):Rule
{
    return (tree:Tree, context:SchematicContext) =>
    {
        return from(runMigration(tree, context).then(() => tree)) as any;
    };
}

async function runMigration(tree:Tree, context:SchematicContext)
{
    const logger:LoggerApi = context.logger;
    tree.create(componentPath, 'console.log("Foobar!")');

    logger.info(` Content before update: ${tree.read(componentPath)} `);

    if(tree.exists(componentPath))
    {
        let update:UpdateRecorder = tree.beginUpdate(componentPath!);
        let buffer:Buffer | number = tree.read(componentPath) || 0;

        const startIndex:number = buffer.toString().indexOf(queryString);

        update.remove(startIndex, queryString.length);
        update.insertRight(startIndex, replaceString);

        tree.commitUpdate(update);
    }

    logger.info(` Content after update: ${tree.read('hello.component.ts')} `);
}
