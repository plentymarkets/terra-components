import {
    chain,
    Rule,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    addPackageJsonDependency,
    NodeDependency,
    NodeDependencyType
} from 'schematics-utilities';

export function getPeerDependencies(tree:Tree):Array<NodeDependency>
{
    const pathToPackageJson:string = 'src/lib/package.json'; // TODO: This needs to be adjusted to work in other projects
    if(!tree.exists(pathToPackageJson))
    {
        return [];
    }

    const packageJson:any = JSON.parse(tree.read(pathToPackageJson)!.toString('utf8'));

    if(packageJson.peerDependencies )
    {
        return Object.keys(packageJson.peerDependencies).map((dep:string) =>
        {
            return {
                type: NodeDependencyType.Default,
                name: dep,
                version: packageJson.peerDependencies[dep]
            };
        });
    }

    return [];
}

function addPackageJsonDependencies():Rule
{
    return (host:Tree, context:SchematicContext):Tree =>
    {
        const dependencies:Array<NodeDependency> = getPeerDependencies(host);
        dependencies.forEach((dependency:NodeDependency) =>
        {
            addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
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
export function ngAdd():Rule
{
    return chain([
        addPackageJsonDependencies(),
        installPackageJsonDependencies(),
    ]);
}
