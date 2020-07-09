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

function getTCPackageJsonPath():string
{
    return 'src/lib/package.json'; // TODO: This needs to be adjusted to work in other projects
}

function getPackageJsonContent(tree:Tree):JsonSchemaForNpmPackageJsonFiles
{
    const pathToPackageJson:string = getTCPackageJsonPath();
    if(!tree.exists(pathToPackageJson))
    {
        return [];
    }

    return JSON.parse(tree.read(pathToPackageJson)!.toString('utf8'));
}

function getTCPeerDependencies(tree:Tree):Array<NodeDependency>
{
    const packageJson:JsonSchemaForNpmPackageJsonFiles = getPackageJsonContent(tree);
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
        const tcPeerDependencies:Array<NodeDependency> = getTCPeerDependencies(host);
        context.logger.info(`Installing peer dependencies...`);
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
