import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

/**
 * @author chirila-ioan-daniel
 */
export interface NestedValueInterface
{
    id:number;
    isActive:boolean;
    isOpen:boolean;
    isVisible:boolean;
    name:string;
    tooltip:string;
    tooltipPlacement:TerraPlacementEnum;
}
