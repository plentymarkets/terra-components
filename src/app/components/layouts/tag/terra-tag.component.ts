import {
    Component,
    Input
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Color } from '../../forms/input/color-picker/color.helper';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent
{
    @Input()
    public inputBadge:string;

    @Input()
    public inputIsTagged:boolean;

    @Input()
    public inputIsTaggable:boolean;

    @Input()
    public inputCustomClass:string;

    @Input()
    /**
     * The background color for the tag.
     */
    public inputColor:string;

    constructor()
    {
        this.inputIsTagged = false;
        this.inputIsTaggable = false;
        this.inputColor = null;
        this.inputCustomClass = null;
    }

    /**
     * Get the background color.
     * @returns {string}
     * @see inputColor
     */
    private getBgColor():string
    {
         if(!isNullOrUndefined(this.inputColor))
         {
             return this.inputColor;
         }
         return null;
    }

    /**
     * Get the foreground color.
     */
    private getColor():string
    {
         if(!isNullOrUndefined(this.inputColor))
         {
             return (new Color(this.inputColor)).isDark() ? '#ffffff' : '#000000';
         }
        return null;
    }
}
