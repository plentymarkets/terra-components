import {
    Component,
    Input
} from '@angular/core';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraTileBoxColor } from './data/terra-tile-box-color';

/**
 * @author mkunze
 * @deprecated use `terra-card` instead.
 */
@Component({
    selector: 'terra-tile-box',
    styles:   [require('./terra-tile-box.component.scss')],
    template: require('./terra-tile-box.component.html')
})
export class TerraTileBoxComponent
{
    @Input()
    public inputTitle:string;

    @Input()
    public inputSubTitle:string;

    @Input()
    public inputText:string;

    @Input()
    public inputImagePath:string;

    @Input()
    public inputIsSelected:boolean;

    @Input()
    public inputIsDragging:boolean;

    @Input()
    public inputIsDropTarget:boolean;

    @Input()
    public inputIsHover:boolean;

    @Input()
    public inputColor:TerraTileBoxColor; // default LIGHT_BLUE

    @Input()
    public inputIsLineView:boolean;

    @Input()
    public inputButtonList:Array<TerraButtonInterface>;

    private stopPropagation(event:Event):void
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
        };
    }
}
