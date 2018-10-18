import { TerraMultiSplitViewInterface } from '../interfaces/terra-multi-split-view.interface';
import * as flatted from 'flatted';

/**
 * @deprecated Will be removed in the next major release.
 */
export class TerraMultiSplitViewHelper
{
    public static isSameView(parent:TerraMultiSplitViewInterface, child:TerraMultiSplitViewInterface):boolean
    {
        return this.hasSameModule(parent, child) &&
               (this.hasSameInputs(parent, child) || this.hasSameName(parent, child));
    }

    private static hasSameInputs(parent:TerraMultiSplitViewInterface, child:TerraMultiSplitViewInterface):boolean
    {
        return child.inputs && parent.inputs &&
               flatted.stringify(child.inputs) === flatted.stringify(parent.inputs);
    }

    private static hasSameName(parent:TerraMultiSplitViewInterface, child:TerraMultiSplitViewInterface):boolean
    {
        return child.name === parent.name;
    }

    private static hasSameModule(parent:TerraMultiSplitViewInterface, child:TerraMultiSplitViewInterface):boolean
    {
        return child.module.ngModule === parent.module.ngModule;
    }

}
