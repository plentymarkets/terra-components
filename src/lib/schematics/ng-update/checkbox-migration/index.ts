import { Rule, SchematicContext, SchematicsException, Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { LoggerApi } from '@angular-devkit/core/src/logger';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { createMigrationProgram } from '../../utils/compiler-hosts';
import * as ts from 'typescript';
import { relative } from 'path';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { Schema as MigrateCheckboxSchema } from './schema';

/**
 * Interface that represents the bounding of a terra-checkbox.
 */
interface CheckboxBoundingInterface {
    /** The terra-checkbox as a plain string for replacing and deletion */
    checkboxAsString: string;
    /** Index that determines the begin of the checkbox within the file. */
    start: number;
    /** Index that determines the end of the checkbox within the file. */
    end: number;
    /** Total length of the Checkbox. Includes the opening and closing tag as well. */
    length: number;
}

let logger: LoggerApi;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function checkboxMigration(_options: MigrateCheckboxSchema): Rule {
    return (tree: Tree, context: SchematicContext): void => {
        const { buildPaths, testPaths }: { [key: string]: Array<string> } = getProjectTsConfigPaths(tree);
        const basePath: string = process.cwd();
        const allPaths: Array<string> = [...buildPaths, ...testPaths];
        const pathToMigrate: string = _options.modulePath as string;

        logger = context.logger;

        if (!allPaths.length) {
            throw new SchematicsException('Could not find any tsconfig file. Cannot migrate any checkbox entities.');
        }

        if (pathToMigrate) {
            if (tree.exists(pathToMigrate)) {
                for (const tsconfigPath of allPaths) {
                    runCkeckboxMigration(
                        tree,
                        tsconfigPath,
                        basePath,
                        pathToMigrate.slice(0, pathToMigrate.lastIndexOf('/'))
                    );
                }
            } else {
                throw new SchematicsException('Could not find path. Please try again.');
            }
        } else {
            for (const tsconfigPath of allPaths) {
                runCkeckboxMigration(tree, tsconfigPath, basePath);
            }
        }
    };
}

function runCkeckboxMigration(tree: Tree, tsconfigPath: string, basePath: string, pathToMigrate?: string): void {
    const program: ts.Program = createMigrationProgram(tree, tsconfigPath, basePath).program;
    // const typeChecker:ts.TypeChecker = program.getTypeChecker();
    let sourceFiles: Array<ts.SourceFile> = program
        .getSourceFiles()
        .filter((f: ts.SourceFile) => !f.isDeclarationFile && !program.isSourceFileFromExternalLibrary(f));
    if (pathToMigrate) {
        sourceFiles = sourceFiles.filter((f: ts.SourceFile) =>
            relative(basePath, f.fileName).startsWith(pathToMigrate)
        );
    }
    // const printer = ts.createPrinter();
    let fileNamesOfMigratedTemplates: Array<string> = [];
    let moduleFileNames: Array<string> = [];

    sourceFiles.forEach((sourceFile: ts.SourceFile) => {
        const fileName: string = relative(basePath, sourceFile.fileName);
        if (isComponent(fileName, tree.read(fileName))) {
            const templateFileName: string = fileName.replace('component.ts', 'component.html');
            if (tree.exists(templateFileName)) {
                let { checkboxAsString, start, length }: CheckboxBoundingInterface = getBounding(
                    tree.read(templateFileName)
                );
                const fileContainsTerraCheckBox: boolean = !!checkboxAsString;
                while (start >= 0) {
                    const valueCaption: string = getAttributeValue(checkboxAsString, 'inputCaption');
                    const inputIcon: string = getAttributeWithoutValue(checkboxAsString, 'inputIcon');

                    const fontIcon: string = inputIcon ? inputIcon.replace('inputIcon', 'fontIcon') : null;

                    checkboxAsString = doDeletions(doReplacements(handleValue(checkboxAsString)));

                    const template: string = `${checkboxAsString}${fontIcon ? `<mat-icon ${fontIcon}></mat-icon>` : ''}
                            ${valueCaption ? `${valueCaption}` : ''}
                        </mat-checkbox>`;

                    const update: UpdateRecorder = tree.beginUpdate(templateFileName!);
                    update.remove(start, length);
                    update.insertRight(start, template);
                    tree.commitUpdate(update);

                    ({ checkboxAsString, start, length } = getBounding(tree.read(templateFileName)));
                }
                if (fileContainsTerraCheckBox) {
                    fileNamesOfMigratedTemplates.push(fileName);
                }
            }
        }
        if (isModule(fileName, tree.read(fileName))) {
            moduleFileNames.push(fileName);
        }
    });
    fileNamesOfMigratedTemplates.forEach((fileName: string) => {
        // add MatCheckboxModule to referred module
        addModuleToImports(tree, fileName, moduleFileNames);
    });

    if (fileNamesOfMigratedTemplates.length > 0) {
        logger.info(
            fileNamesOfMigratedTemplates.length + ' entities based on config ' + tsconfigPath + ' have been migrated.'
        );
    }
}

/**
 * Checks whether the file is a component.
 * @param fileName
 * @param file
 */
function isComponent(fileName: string, file: Buffer | null): boolean {
    if (fileName.endsWith('.d.ts') && !fileName.endsWith('.ts')) {
        return false;
    }
    return file.toString().match(new RegExp('@Component\\(')) !== null;
}

/**
 * Checks whether the file is a module.
 * @param fileName
 * @param file
 */
function isModule(fileName: string, file: Buffer | null): boolean {
    if (fileName.endsWith('.d.ts') && !fileName.endsWith('.ts')) {
        return false;
    }
    return file.toString().match(new RegExp('@NgModule\\(')) !== null;
}

/**
 * Gets the component's class name from the component.ts file.
 * @param tree
 * @param fileName
 */
function getComponentClassName(tree: Tree, fileName: string): string {
    const buffer: Buffer | number = tree.read(fileName) || 0;
    const content: string = buffer.toString();
    const componentNameMatches: RegExpMatchArray | null = content.match(new RegExp('export class \\w*'));
    if (componentNameMatches !== null) {
        return componentNameMatches[0].substring('export class '.length);
    }
    return null;
}

/**
 * Gets the module path referred to its component.
 * @param tree
 * @param componentName
 * @param moduleFileNames
 */
function getReferredModule(tree: Tree, componentName: string, moduleFileNames: Array<string>): string {
    return moduleFileNames.find((moduleFileName: string) => {
        const buffer: Buffer | number = tree.read(moduleFileName) || 0;
        const content: string = buffer.toString();
        const nameMatches: RegExpMatchArray | null = content.match(componentName + ',?');
        const importRegEx: RegExp = new RegExp(`import\\s?\{\\s*${componentName}\\s?\}\\s?from\\s?\'`, 'gm');
        const importMatches: RegExpMatchArray | null = content.match(importRegEx);
        if (nameMatches !== null && importMatches !== null) {
            return moduleFileName;
        }
    });
}

/**
 * Gets the tree, a file name and all file names of modules and adds 'MatCheckboxModule' to a referred module
 * @param tree
 * @param fileName
 * @param moduleFileNames
 */
function addModuleToImports(tree: Tree, fileName: string, moduleFileNames: Array<string>): void {
    let componentClassName: string = getComponentClassName(tree, fileName);
    let referredModule: string = getReferredModule(tree, componentClassName, moduleFileNames);
    if (referredModule !== undefined) {
        addModuleImportToModule(tree, referredModule, 'MatCheckboxModule', '@angular/material/checkbox');
        addModuleImportToModule(tree, referredModule, 'MatIconModule', '@angular/material/icon');
    } else {
        logger.warn(
            'No referred module for ' +
                fileName +
                ' found. Import  MatCheckboxModule and MatIconModule manually if needed.'
        );
    }
}

/**
 * Get the Value of a given Attribute. The returned value has interpolation braces for usage anywhere in the template.
 * @param bufferString
 * @param attribute
 */
function getAttributeValue(bufferString: string, attribute: string): string {
    const [completeAttribute, value]: [string, string] = getAttributeWithValue(bufferString, attribute);

    return value ? `${completeAttribute.startsWith('[') ? '{{' + value + '}}' : value}` : null;
}

/**
 * Get the complete attribute of a given attribute.
 * @param bufferString
 * @param attribute
 */
function getAttributeWithValue(bufferString: string, attribute: string): [string, string] {
    const regExp: RegExp = new RegExp(`\\[?${attribute}\\]?="(.*?)"`);
    let completeAttribute: string, value: string;
    [completeAttribute, value] = bufferString.match(regExp) || ['', null];

    return [completeAttribute, value];
}

/**
 * Get the complete attribute of a given attribute.
 * @param bufferString
 * @param attribute
 */
function getAttributeWithoutValue(bufferString: string, attribute: string): string {
    return getAttributeWithValue(bufferString, attribute)[0];
}

/**
 * Get the bounding of the next terra-checkbox within the buffer.
 * @see CheckboxBoundingInterface
 * @param buffer
 */
function getBounding(buffer: Buffer): CheckboxBoundingInterface {
    const bufferString: string = buffer.toString() || '';
    const checkBoxClosingTag: string = '</terra-checkbox>';
    const regExp: RegExp = new RegExp('<terra-checkbox(\\s|>)');
    const [start, end]: [number, number] = [bufferString.search(regExp), bufferString.indexOf(checkBoxClosingTag)];
    const length: number = end - start + checkBoxClosingTag.length;
    // get only one checkbox, otherwise we could find attributes from another
    const checkboxAsString: string = bufferString.substring(start, end);
    return {
        checkboxAsString: checkboxAsString,
        start: start,
        end: end,
        length: length
    };
}

/**
 * Rename attributes to match the mat-checkbox attributes.
 * @param checkboxAsString
 */
function doReplacements(checkboxAsString: string): string {
    return checkboxAsString
        .replace('terra-checkbox', 'mat-checkbox')
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
function doDeletions(checkboxAsString: string): string {
    return checkboxAsString
        .replace(new RegExp('\\[?\\(?notifyOnChanges\\)?\\]?=".*?"'), '')
        .replace(new RegExp('\\[?inputCaption\\]?=".*?"'), '')
        .replace(new RegExp('\\[?inputIcon\\]?=".*?"'), '');
}

/**
 * Remove or replace value.
 * @param checkboxAsString
 */
function handleValue(checkboxAsString: string): string {
    // If ngModel already exists just delete value, otherwise replace value with ngModel.
    return checkboxAsString.indexOf('ngModel') >= 0
        ? checkboxAsString.replace(new RegExp('\\[?\\(?value\\)?\\]?=".*?"'), '')
        : checkboxAsString.replace('value', 'ngModel');
}
