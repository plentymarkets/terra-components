import { Rule, SchematicContext, SchematicsException, Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { LoggerApi } from '@angular-devkit/core/src/logger';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { createMigrationProgram } from '../../utils/compiler-hosts';
import * as ts from 'typescript';
import { relative } from 'path';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { Schema as MigratePortletSchema } from './schema';

/**
 * Interface that represents the bounding of a terra-checkbox.
 */
interface PortletBoundingInterface {
    /** The terra-portlet as a plain string for replacing and deletion */
    portletAsString: string;
    /** The body of the portlet to be injected in the ng-content tag */
    contentBuffer: string;
    /** Index that determines the begin of the portlet within the file. */
    start: number;
    /** Index that determines the end of the portlet within the file. */
    end: number;
    /** Total length of the portlet. Includes the opening and closing tag as well. */
    length: number;
}

let logger: LoggerApi;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function portletMigration(_options: MigratePortletSchema): Rule {
    return (tree: Tree, context: SchematicContext): void => {
        const { buildPaths, testPaths }: { [key: string]: Array<string> } = getProjectTsConfigPaths(tree);
        const basePath: string = process.cwd();
        const allPaths: Array<string> = [...buildPaths, ...testPaths];
        const pathToMigrate: string = _options.modulePath as string;

        logger = context.logger;

        if (!allPaths.length) {
            throw new SchematicsException('Could not find any tsconfig file. Cannot migrate any portlet entities.');
        }

        if (pathToMigrate) {
            if (tree.exists(pathToMigrate)) {
                for (const tsconfigPath of allPaths) {
                    runPortletMigration(
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
                runPortletMigration(tree, tsconfigPath, basePath);
            }
        }
    };
}

function getHeaderHTML(title: string, infoText?: string, placement?: string) {
    return `
        <mat-expansion-panel-header>
            <mat-panel-title> ${title} </mat-panel-title>
                ${infoText ? `<mat-icon [tcTooltip]=${infoText} [placement]=${placement}>info</mat-icon>` : ''}
        </mat-expansion-panel-header>
    `;
    //TODO check if mat icon info is right
    //TODO check if tooltip icon should be part of mat panel title
}

function runPortletMigration(tree: Tree, tsconfigPath: string, basePath: string, pathToMigrate?: string): void {
    const program: ts.Program = createMigrationProgram(tree, tsconfigPath, basePath).program;
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
                let { portletAsString, contentBuffer, start, length }: PortletBoundingInterface = getBounding(
                    tree.read(templateFileName)
                );
                const fileContainsTerraPortlet: boolean = !!portletAsString;
                while (start >= 0) {
                    const inputPortletHeaderValue = getAttributeValue(portletAsString, 'inputPortletHeader');
                    const inputIsCollapsableValue = getAttributeValue(portletAsString, 'inputIsCollapsable').includes(
                        'true'
                    )
                        ? true
                        : false;
                    const inputCollapsedValue = getAttributeValue(portletAsString, 'inputCollapsed').includes('true')
                        ? true
                        : false;
                    //const inputIsDisabledValue = getAttributeValue(portletAsString, 'inputIsDisabled').includes('true') ? true : false;
                    const infoTextValue = getAttributeValue(portletAsString, 'infoText');
                    const inputCollapsedChangeOutput = getAttributeValue(portletAsString, 'inputCollapsedChange');

                    //TODO check if inputIsCollapsable
                    const template = `
                        <mat-expansion-panel ${!inputCollapsedValue ? 'expanded' : ''} ${
                        !inputIsCollapsableValue ? 'disabled' : ''
                    }
                                             ${
                                                 inputCollapsedChangeOutput
                                                     ? `(expandedChange)=${inputCollapsedChangeOutput}`
                                                     : ''
                                             }
                        >
                            ${
                                inputPortletHeaderValue || inputIsCollapsableValue
                                    ? getHeaderHTML(inputPortletHeaderValue, infoTextValue, 'right')
                                    : ''
                            }
                            ${contentBuffer}
                        </mat-expansion-panel>
                    `;
                    //TODO check status of custom CSS animation, do we need to migrate it as well?

                    //TODO is this still useful?
                    //checkboxAsString = doDeletions(doReplacements(handleValue(checkboxAsString)));

                    const update: UpdateRecorder = tree.beginUpdate(templateFileName!);
                    update.remove(start, length);
                    update.insertRight(start, template);
                    tree.commitUpdate(update);
                }
                if (fileContainsTerraPortlet) {
                    fileNamesOfMigratedTemplates.push(fileName);
                }
            }
        }
        if (isModule(fileName, tree.read(fileName))) {
            moduleFileNames.push(fileName);
        }
    });
    fileNamesOfMigratedTemplates.forEach((fileName: string) => {
        // add MatExpansionModule, MatIconModule to referred module
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
    //TODO check if expansion panel has the info text tooltip & icon, and then add the icon module
    let componentClassName: string = getComponentClassName(tree, fileName);
    let referredModule: string = getReferredModule(tree, componentClassName, moduleFileNames);
    if (referredModule !== undefined) {
        addModuleImportToModule(tree, referredModule, 'MatExpansionModule', '@angular/material/expansion');
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
 * Get the bounding of the next terra-checkbox within the buffer.
 * @see PortletBoundingInterface
 * @param buffer
 */
function getBounding(buffer: Buffer): PortletBoundingInterface {
    const bufferString: string = buffer.toString() || '';
    const portletClosingTag: string = '</terra-portlet>';
    const regExp: RegExp = new RegExp('<terra-portlet(\\s|>)');
    const [start, end]: [number, number] = [bufferString.search(regExp), bufferString.indexOf(portletClosingTag)];
    const length: number = end - start + portletClosingTag.length;

    const contentBufferStart = bufferString.search('>') + 1;
    const contentBufferEnd = bufferString.indexOf(portletClosingTag);
    const contentBuffer = bufferString.slice(contentBufferStart, contentBufferEnd);

    // get only one checkbox, otherwise we could find attributes from another
    const portletAsString: string = bufferString.substring(start, end);
    return {
        portletAsString,
        contentBuffer,
        start: start,
        end: end,
        length: length
    };
}
