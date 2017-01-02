import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';
/**
 * @author mkunze
 */
@Component({
               selector: 'terra-tile-box',
               styles:   [require('./terra-tile-box.component.scss').toString()],
               template: require('./terra-tile-box.component.html')
           })
export class TerraTileBoxComponent
{
    @Input() inputTitle:string;
    @Input() inputSubTitle:string;
    @Input() inputText:string;
    @Input() inputImagePath:string;
    @Input() inputIsSelected:boolean;
    @Input() inputIsDragging:boolean;
    @Input() inputIsDropTarget:boolean;
    @Input() inputButtonList:Array<TerraButtonInterface>;
    
    constructor()
    {
    }
    
    private stopPropagation(event)
    {
        event.stopPropagation();
    }
}
