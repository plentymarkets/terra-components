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
import {
    oneLineTrim
} from 'common-tags';

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
        const { buildPaths, testPaths }:{[key:string]:Array<string>} = getProjectTsConfigPaths(tree);
        const basePath:string = process.cwd();
        const allPaths:Array<string> = [...buildPaths, ...testPaths];

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
        if(isComponent(fileName))
        {
            const templateFileName:string = fileName.replace('component.ts', 'component.html');
            if(tree.exists(templateFileName))
            {
                let buffer:Buffer | number = tree.read(templateFileName) || 0;
                let index:number = buffer.toString().indexOf('terra-checkbox');

                while(index >= 0)
                {
                    let update:UpdateRecorder = tree.beginUpdate(templateFileName!);

                    const valueCaption:string = getAttributeValue(buffer.toString(), 'inputCaption');
                    let valueIcon:string = getAttributeValue(buffer.toString(), 'inputIcon');

                    // valueCaption === true -> add <span> with dataBinding (or not), otherwise add nothing
                    let template:string =
                        oneLineTrim`<mat-checkbox>
                            ${ valueIcon ? `<span class="checkbox-icon ${valueIcon}"></span>` : '' }
                            ${ valueCaption ? `<span>${valueCaption}</span>` :  '' }
                        </mat-checkbox>`;

                    logger.info(template);

                    update.remove(index, 'terra-checkbox'.length);
                    update.insertRight(index, 'mat-checkbox');
                    tree.commitUpdate(update);
                    buffer = tree.read(templateFileName) || 0;
                    index = buffer.toString().indexOf('terra-checkbox');
                }
            }
        }
    });
}

function isComponent(fileName:string):boolean
{
    return fileName.endsWith('component.ts');
}

function getAttributeValue(bufferString:string, attribute:string):string
{
    const regExp:RegExp = new RegExp(`\\[?${attribute}\\]?="(.*)"`);
    let caption:string, value:string;
    [caption, value] = bufferString.match(regExp) || ['', null];

    return value ? `${caption.startsWith('[') ? '{{' + value + '}}' : value}` : null;
}
