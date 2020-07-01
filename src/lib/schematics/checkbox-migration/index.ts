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
import { addModuleImportToModule } from '@angular/cdk/schematics';

/**
 * Interface that represents the bounding of a terra-checkbox.
 */
interface CheckboxBoundingInterface
{
    /** The terra-checkbox as a plain string for replacing and deletion */
    checkboxAsString:string;
    /** Index that determines the begin of the checkbox within the file. */
    start:number;
    /** Index that determines the end of the checkbox within the file. */
    end:number;
    /** Total length of the Checkbox. Includes the opening and closing tag as well. */
    length:number;
}

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

    sourceFiles.forEach((sourceFile:ts.SourceFile) =>
    {
        const fileName:string = relative(basePath, sourceFile.fileName);
        if(isComponent(fileName, tree.read(fileName)))
        {
            const templateFileName:string = fileName.replace('component.ts', 'component.html');
            if(tree.exists(templateFileName))
            {
                let {checkboxAsString, start, length}:CheckboxBoundingInterface = getBounding(tree.read(templateFileName));
                const fileContainsTerraCheckBox:boolean = !!checkboxAsString;
                while(start >= 0)
                {
                    const valueCaption:string = getAttributeValue(checkboxAsString, 'inputCaption');
                    const valueIcon:string = getAttributeValue(checkboxAsString, 'inputIcon');

                    checkboxAsString = doDeletions(doReplacements(handleValue(checkboxAsString)));

                    const template:string =
                        oneLine`${checkboxAsString}
                            ${valueIcon ? `<span class="checkbox-icon ${valueIcon}"></span>` : ''}
                            ${valueCaption ? `<span>${valueCaption}</span>` : ''}
                        </mat-checkbox>`;

                    const update:UpdateRecorder = tree.beginUpdate(templateFileName!);
                    update.remove(start, length);
                    update.insertRight(start, template);
                    tree.commitUpdate(update);

                    ({
                        checkboxAsString,
                        start,
                        length
                    } = getBounding(tree.read(templateFileName)));
                }
                // add MatCheckboxModule to referred module
                if(fileContainsTerraCheckBox)
                {
                    let componentClassName:string = getComponentClassName(tree, fileName);
                    let referredModule:string = getReferredModule(tree, fileName, componentClassName);
                    if(referredModule !== null)
                    {
                        addModuleImportToModule(tree, referredModule, 'MatCheckboxModule', '@angular/material/checkbox');
                    }
                }
            }
        }
    });
}

/**
 * Checks whether the file is a component.
 * @param fileName
 * @param file
 */
function isComponent(fileName:string, file:Buffer | null):boolean
{
    if(fileName.endsWith('.d.ts') && !fileName.endsWith('.ts'))
    {
        return false;
    }
    const componentsRegEx:RegExp = new RegExp('@Component\\(');
    return file.toString().match(componentsRegEx) !== null;
}

/**
 * Gets the component's class name from the component.ts file.
 * @param tree
 * @param fileName
 */
function getComponentClassName(tree:Tree, fileName:string):string
{
    const buffer:Buffer | number = tree.read(fileName) || 0;
    const content:string = buffer.toString();
    const componentNameMatches:RegExpMatchArray | null = content.match(new RegExp('export class \\w*'));
    if(componentNameMatches !== null)
    {
        return componentNameMatches[0].substring('export class '.length);
    }
    return null;
}

/**
 * Gets the module path referred to its component.
 * @param tree
 * @param path
 * @param componentName
 */
function getReferredModule(tree:Tree, path:string, componentName:string):string
{
    const moduleFileName:string = path.replace('component.ts', 'module.ts');
    if(tree.exists(moduleFileName))
    {
        const buffer:Buffer | number = tree.read(moduleFileName) || 0;
        const content:string = buffer.toString();
        const nameMatches:RegExpMatchArray | null = content.match(componentName + ',?');
        const importRegEx:RegExp = new RegExp(`import\\s?\{\\s*${componentName}\\s?\}\\s?from\\s?\'`, 'gm');
        const importMatches:RegExpMatchArray | null = content.match(importRegEx);
        if(nameMatches !== null && importMatches !== null)
        {
            return moduleFileName;
        }
        // TODO look through parent directories to find the referred module
        // else
        // {
        //     return isReferredModule(tree, )
        // }
    }
    return null;
}

/**
 * Get the Value of a given Attribute. The returned value has interpolation braces for usage anywhere in the template.
 * @param bufferString
 * @param attribute
 */
function getAttributeValue(bufferString:string, attribute:string):string
{
    const regExp:RegExp = new RegExp(`\\[?${attribute}\\]?="(.*)"`);
    let caption:string, value:string;
    [caption,
     value] = bufferString.match(regExp) || ['',
                                             null];

    return value ? `${caption.startsWith('[') ? '{{' + value + '}}' : value}` : null;
}

/**
 * Get the bounding of the next terra-checkbox within the buffer.
 * @see CheckboxBoundingInterface
 * @param buffer
 */
function getBounding(buffer:Buffer):CheckboxBoundingInterface
{
    const bufferString:string = buffer.toString() || '';
    const checkBoxClosingTag:string = '</terra-checkbox>';
    const regExp:RegExp = new RegExp('<terra-checkbox(\\s|>)');
    const [start, end]:[number, number] = [bufferString.search(regExp),
                                           bufferString.indexOf(checkBoxClosingTag)];
    const length:number = (end - start) + checkBoxClosingTag.length;
    // get only one checkbox, otherwise we could find attributes from another
    const checkboxAsString:string = bufferString.substring(start, end);
    return {
        checkboxAsString: checkboxAsString,
        start:            start,
        end:              end,
        length:           length
    };
}

/**
 * Rename attributes to match the mat-checkbox attributes.
 * @param checkboxAsString
 */
function doReplacements(checkboxAsString:string):string
{
    return checkboxAsString.replace('terra-checkbox', 'mat-checkbox')
                           .replace('isIndeterminate', 'indeterminate')
                           .replace('isIndeterminateChange', 'indeterminateChange')
                           .replace('inputIsDisabled', 'disabled')
                           .replace('tooltipText', 'tcTooltip')
                           .replace('tooltipPlacement', 'placement');
}

/**
 * Removes attributes that are no longer supported.
 * @param checkboxAsString
 */
function doDeletions(checkboxAsString:string):string
{
    return checkboxAsString.replace(new RegExp('\\[?\\(?notifyOnChanges\\)?\\]?=".*"'), '')
                           .replace(new RegExp('\\[?inputCaption\\]?=".*"'), '')
                           .replace(new RegExp('\\[?inputIcon\\]?=".*"'), '');
}

/**
 * Remove or replace value.
 * @param checkboxAsString 
 */
function handleValue(checkboxAsString:string):string
{
    // If ngModel already exists just delete value, otherwise replace value with ngModel.
    return checkboxAsString.indexOf('ngModel') >= 0 ?
        checkboxAsString.replace(new RegExp('\\[?\\(?value\\)?\\]?=".*"'), '') :
        checkboxAsString.replace('value', 'ngModel');
}
