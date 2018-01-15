import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraTileBoxColor } from './data/terra-tile-box-color';

/**
 * @author mkunze
 */
@Component({
    selector: 'terra-tile-box',
    styles:   [require('./terra-tile-box.component.scss')],
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
    @Input() inputIsHover:boolean;
    @Input() inputColor:TerraTileBoxColor; //default LIGHT_BLUE
    @Input() inputIsLineView:boolean;
    @Input() inputButtonList:Array<TerraButtonInterface>;

    constructor()
    {
    }

    private stopPropagation(event):void
    {
        event.stopPropagation();
    }

    private setClassesToTileBoxItem():Object
    {
        let isLightBlue:boolean = false;
        let isBlue:boolean = false;
        let isDarkBlue:boolean = false;

        switch(this.inputColor)
        {
            case TerraTileBoxColor.LIGHT_BLUE:

                isLightBlue = true;
                break;

            case TerraTileBoxColor.BLUE:

                isBlue = true;
                break;

            case TerraTileBoxColor.DARK_BLUE:

                isDarkBlue = true;
                break;

            default:
                isLightBlue = true;
        }

        return {
            light_blue:  isLightBlue,
            blue:        isBlue,
            dark_blue:   isDarkBlue,
            is_selected: this.inputIsSelected,
            is_dragging: this.inputIsDragging
        }
    }
}
