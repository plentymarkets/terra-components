import { TerraLeafInterface } from './terra-leaf.interface';

/**
 * @author ziyad.HajjHassan
 */
export interface TerraCheckboxLeafInterface extends TerraLeafInterface {
  checkboxChecked?: boolean;
  isIndeterminate?: boolean;
  leafParent?: TerraCheckboxLeafInterface;
  subLeafList?: Array<TerraCheckboxLeafInterface>;
  parentLeafList?: Array<TerraCheckboxLeafInterface>;
  isDisabled?: boolean;
}
