import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/** @description schematic for ng add support */
export function ngAdd(): Rule {
    return (tree: Tree, context: SchematicContext): Tree => {
        // For now, just return the tree and install the lib using any package manager
        context.addTask(new NodePackageInstallTask());
        return tree;
    };
}
