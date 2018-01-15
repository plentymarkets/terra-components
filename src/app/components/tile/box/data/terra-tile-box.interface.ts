import { TerraButtonInterface } from '../../../button/data/terra-button.interface';
import { TerraTileBoxColor } from './terra-tile-box-color';

/**
 * @author mkunze
 */
export interface TerraTileBoxInterface
{
    title:string;
    imagePath?:string;
    subTitle?:string;
    text:string;
    isSelected?:boolean;
    isDragging?:boolean;
    isDropTarget?:boolean;
    isHover?:boolean;
    color?:TerraTileBoxColor;
    buttonList?:Array<TerraButtonInterface>;
}