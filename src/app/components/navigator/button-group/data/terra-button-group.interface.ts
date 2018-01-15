import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

/**
 * @author mscharf
 */
export interface TerraButtonGroupInterface extends TerraButtonInterface
{
    hasChildren:boolean;
    isVisible:boolean;
}
