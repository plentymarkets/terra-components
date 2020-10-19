import { TerraLeafInterface } from './terra-leaf.interface';

/**
 * @author ziyad.HajjHassan
 * @deprecated since v5. Use mat-tree instead.
 */
export interface TerraCheckboxLeafInterface extends TerraLeafInterface {
    checkboxChecked?: boolean;
    isIndeterminate?: boolean;
    leafParent?: TerraCheckboxLeafInterface;
    subLeafList?: Array<TerraCheckboxLeafInterface>;
    parentLeafList?: Array<TerraCheckboxLeafInterface>;
    isDisabled?: boolean;
}
