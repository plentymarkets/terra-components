import { TerraNodeInterface } from '../data/terra-node.interface';
import { isNull, isNullOrUndefined } from 'util';

/**
 * @author mfrank
 * @deprecated since v5. Use mat-tree instead.
 */
export class TerraNodeTreeHelper {
    public static recursiveFindNode<D>(
        nodeList: Array<TerraNodeInterface<D>>,
        nodeToFind: TerraNodeInterface<D>
    ): TerraNodeInterface<D> {
        let foundNode: TerraNodeInterface<D> = null;

        if (!isNullOrUndefined(nodeToFind)) {
            for (let node of nodeList) {
                if (node === nodeToFind) {
                    foundNode = node;

                    return foundNode;
                } else if (node.children) {
                    foundNode = this.recursiveFindNode(node.children, nodeToFind);

                    if (!isNull(foundNode)) {
                        break;
                    }
                }
            }
        }

        return foundNode;
    }

    public static recursiveFindNodeById<D>(
        nodeList: Array<TerraNodeInterface<D>>,
        id: string | number
    ): TerraNodeInterface<D> {
        let foundNode: TerraNodeInterface<D> = null;

        if (!isNullOrUndefined(id)) {
            for (let node of nodeList) {
                if (!isNullOrUndefined(id) && !isNullOrUndefined(node.id) && node.id.toString() === id.toString()) {
                    foundNode = node;

                    return foundNode;
                } else if (node.children) {
                    foundNode = this.recursiveFindNodeById(node.children, id);

                    if (!isNull(foundNode)) {
                        break;
                    }
                }
            }
        }

        return foundNode;
    }

    public static recursiveSetParentAndDefaultVisibility<D>(
        list: Array<TerraNodeInterface<D>>,
        parent?: TerraNodeInterface<D>
    ): void {
        for (let node of list) {
            this.setDefaultVisibility(node);
            if (!isNullOrUndefined(parent)) {
                node.parent = parent;
            }

            if (!isNullOrUndefined(node.children)) {
                this.recursiveSetParentAndDefaultVisibility(node.children, node);
            }
        }
    }

    public static recursiveSetNodeInactive<D>(nodeList: Array<TerraNodeInterface<D>>): void {
        nodeList.forEach((node: TerraNodeInterface<D>) => {
            node.isActive = false;

            if (!isNullOrUndefined(node.children) && node.children.length > 0) {
                this.recursiveSetNodeInactive(node.children);
            }
        });
    }

    public static setDefaultVisibility<D>(node: TerraNodeInterface<D>): void {
        node.defaultVisibility = !!node.isVisible;
    }
}
