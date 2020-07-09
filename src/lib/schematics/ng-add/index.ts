import {
    chain,
    Rule,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    addPackageJsonDependency,
    getPackageJsonDependency,
    NodeDependency,
    NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import {
    Dependency,
    JsonSchemaForNpmPackageJsonFiles
} from '@schematics/update/update/package-json';

function getTCPackageJsonPath(debug:boolean):string
{
    const nodeModulesPath:string = './node_modules/@plentymarkets/terra-components/package.json';
    const localPath:string = 'src/lib/package.json';
    return debug ? localPath : nodeModulesPath;
}

function getPackageJsonContent(tree:Tree, context:SchematicContext):JsonSchemaForNpmPackageJsonFiles
{
    const pathToPackageJson:string = getTCPackageJsonPath(context.debug);
    context.logger.debug(pathToPackageJson);
    if(!tree.exists(pathToPackageJson))
    {
        context.logger.error('package.json not found');
        return {};
    }

    const fileContent:string = tree.read(pathToPackageJson)!.toString('utf8');
    return JSON.parse(fileContent);
}

function getTCPeerDependencies(tree:Tree, context:SchematicContext):Array<NodeDependency>
{
    const packageJson:JsonSchemaForNpmPackageJsonFiles = getPackageJsonContent(tree, context);
    const peerDependencies:Dependency = packageJson.peerDependencies || {};

    return Object.keys(peerDependencies).map((dep:string) =>
    {
        return {
            type:    NodeDependencyType.Default,
            name:    dep,
            version: peerDependencies[dep]
        };
    });
}

function addPackageJsonDependencies():Rule
{
    return (host:Tree, context:SchematicContext):Tree =>
    {
        context.logger.info(`Installing peer dependencies...`);
        const tcPeerDependencies:Array<NodeDependency> = getTCPeerDependencies(host, context);
        tcPeerDependencies.forEach((dependency:NodeDependency) =>
        {
            if(getPackageJsonDependency(host, dependency.name))
            {
                context.logger.debug(`❌ Skipped "${dependency.name}"`);
            }
            else
            {
                addPackageJsonDependency(host, dependency);
                context.logger.info(`✅️ Added "${dependency.name}".`);
            }
        });

        return host;
    };
}

function installPackageJsonDependencies():Rule
{
    return (host:Tree, context:SchematicContext):Tree =>
    {
        context.addTask(new NodePackageInstallTask());
        return host;
    };
}

/** @description schematic for ng add support */
export default function():Rule
{
    return chain([
        addPackageJsonDependencies(),
        installPackageJsonDependencies(),
    ]);
}
