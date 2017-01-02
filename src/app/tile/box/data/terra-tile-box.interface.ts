import { TerraButtonInterface } from '../../../button/data/terra-button.interface';
/**
 * @author mkunze
 */
export interface TerraTileBoxInterface
{
    title:string;
    imagePath?: string;
    subTitle?:string;
    text:string;
    isSelected?:boolean;
    isDragging?:boolean;
    isDropTarget?:boolean;
    buttonList?:Array<TerraButtonInterface>;
}