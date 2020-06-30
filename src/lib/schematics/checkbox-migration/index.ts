import {
    Rule,
    SchematicContext,
    SchematicsException,
    Tree,
    UpdateRecorder
} from '@angular-devkit/schematics';
import { LoggerApi } from '@angular-devkit/core/src/logger';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { createMigrationProgram } from '../utils/compiler-hosts';
import * as ts from 'typescript';
import { relative } from 'path';
import { oneLine } from 'common-tags';

// const componentPath:string = './src/app/app.component.html';
//
// const queryString:string = 'Foobar!';
// const replaceString:string = 'Foo Bar!!';

let logger:LoggerApi;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function checkboxMigration(_options:any):Rule
{
    return (tree:Tree, context:SchematicContext):void =>
    {
        const {buildPaths, testPaths}:{ [key:string]:Array<string> } = getProjectTsConfigPaths(tree);
        const basePath:string = process.cwd();
        const allPaths:Array<string> = [...buildPaths,
                                        ...testPaths];

        logger = context.logger;


        if(!allPaths.length)
        {
            throw new SchematicsException(
                'Could not find any tsconfig file. Cannot migrate dynamic queries.');
        }

        for(const tsconfigPath of allPaths)
        {
            logger.info(tsconfigPath);
            runCkeckboxMigration(tree, tsconfigPath, basePath);
        }
    };
}

function runCkeckboxMigration(tree:Tree, tsconfigPath:string, basePath:string):void
{
    const program:ts.Program = createMigrationProgram(tree, tsconfigPath, basePath).program;
    // const typeChecker:ts.TypeChecker = program.getTypeChecker();
    const sourceFiles:Array<ts.SourceFile> = program.getSourceFiles().filter(
        (f:ts.SourceFile) => !f.isDeclarationFile && !program.isSourceFileFromExternalLibrary(f));
    // const printer = ts.createPrinter();

    // program.getSourceFiles().forEach((sourceFile:ts.SourceFile) => {
    //     logger.info(sourceFile.fileName);
    // });

    // logger.info(` Content before update: ${tree.read(relative(basePath, sourceFiles[4].referencedFiles.toString()))} `);

    sourceFiles.forEach((sourceFile:ts.SourceFile) =>
    {
        const fileName:string = relative(basePath, sourceFile.fileName);
        if(isComponent(fileName, tree.read(fileName)))
        {
            const templateFileName:string = fileName.replace('component.ts', 'component.html');
            if(tree.exists(templateFileName))
            {
                let buffer:Buffer = tree.read(templateFileName);

                let {checkboxAsString, start, length} = getBoundings(buffer);

                while(start >= 0)
                {
                    const valueCaption:string = getAttributeValue(checkboxAsString, 'inputCaption');
                    const valueIcon:string = getAttributeValue(checkboxAsString, 'inputIcon');

                    checkboxAsString = doDeletions(doReplacements(checkboxAsString));


                    const template:string =
                        oneLine`${checkboxAsString}
                            ${valueIcon ? `<span class="checkbox-icon ${valueIcon}"></span>` : ''}
                            ${valueCaption ? `<span>${valueCaption}</span>` : ''}
                        </mat-checkbox>`;

                    const update:UpdateRecorder = tree.beginUpdate(templateFileName!);
                    update.remove(start, length);
                    update.insertRight(start, template);
                    tree.commitUpdate(update);

                    buffer = tree.read(templateFileName);
                    ({
                        checkboxAsString,
                        start,
                        length
                    } = getBoundings(buffer));
                }
                // TODO: add MatCheckboxModule to module imports
            }
        }
    });
}

function isComponent(fileName:string, file:Buffer | null):boolean
{
    if(fileName.endsWith('.d.ts') && !fileName.endsWith('.ts'))
    {
        return false;
    }
    let buffer:Buffer | number = file || 0;
    const componentsRexEx:RegExp = new RegExp('@Component\\(');
    return buffer.toString().match(componentsRexEx) !== null;
}

// function isReferredModule(tree:Tree, path:string, componentName:string):boolean
// {
//     const moduleFileName:string = path.replace('component.ts', 'module.ts');
//     if(tree.exists(moduleFileName))
//     {
//         let buffer:Buffer | number = tree.read(moduleFileName) || 0;
//         let content:string = buffer.toString();
//         let nameMatches:RegExpMatchArray | null = content.match('componentName');
//         if(nameMatches !== null && nameMatches.length >= 2)
//         {
//             return true;
//         }
//     }
//     return false;
// }

function getAttributeValue(bufferString:string, attribute:string):string
{
    const regExp:RegExp = new RegExp(`\\[?${attribute}\\]?="(.*)"`);
    let caption:string, value:string;
    [caption,
     value] = bufferString.match(regExp) || ['',
                                             null];

    return value ? `${caption.startsWith('[') ? '{{' + value + '}}' : value}` : null;
}

function getBoundings(buffer:Buffer):{ checkboxAsString:string, start:number, end:number, length:number }
{
    const bufferString:string = buffer.toString() || '';
    const regExp:RegExp = new RegExp('<terra-checkbox(\\s|>)');
    const [start, end]:[number, number] = [bufferString.search(regExp),
                                           bufferString.indexOf('</terra-checkbox>')];
    const length:number = (end - start) + '</terra-checkbox>'.length;
    // get only one checkbox, otherwise we could find attributes from another
    const checkboxAsString:string = bufferString.substring(start, end);
    return {
        checkboxAsString: checkboxAsString,
        start:            start,
        end:              end,
        length:           length
    };
}

function doReplacements(checkboxAsString:string):string
{
    return checkboxAsString.replace('terra-checkbox', 'mat-checkbox')
    .replace('isIndeterminate', 'indeterminate')
    .replace('isIndeterminateChange', 'indeterminateChange')
    .replace('inputIsDisabled', 'disabled')
    .replace('tooltipText', 'tcTooltip')
    .replace('tooltipPlacement', 'placement');
}

function doDeletions(checkboxAsString:string):string
{
    return checkboxAsString.replace(new RegExp('\\[?\\(?value\\)?\\]?=".*"'), '')
    .replace(new RegExp('\\[?\\(?notifyOnChanges\\)?\\]?=".*"'), '')
    .replace(new RegExp('\\[?inputCaption\\]?=".*"'), '')
    .replace(new RegExp('\\[?inputIcon\\]?=".*"'), '');
}
