import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector:    'terra-button',
    styleUrls:   ['./terra-button.component.scss'],
    templateUrl: './terra-button.component.html'
})
export class TerraButtonComponent
{
    /** @description If true, the button will be small. Default false.*/
    @Input()
    public inputIsSmall:boolean;

    /** @description If true, the button will be large. Default false.*/
    @Input()
    public inputIsLarge:boolean;

    /** @description If true, the button will be disabled. Default false.*/
    @Input()
    public inputIsDisabled:boolean;

    /** @description Set the caption.*/
    @Input()
    public inputCaption:string;

    /** @description Set an icon (e.g. icon-save).*/
    @Input()
    public inputIcon:string;

    /** @description Set the html native 'type' attribute, e.g., 'submit or 'reset'. Default 'button'.*/
    @Input()
    public inputType:string;

    /** @description  If true, the button will be aligned to the right side of another element. Default false.*/
    @Input()
    public inputIsAlignRight:boolean;

    /** @description If true, the button will be hidden. Default false.*/
    @Input()
    public inputIsHidden:boolean;

    /** @description Set the tooltip.*/
    @Input()
    public inputTooltipText:string;

    /**
     * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input()
    public inputTooltipPlacement:TerraPlacementEnum;

    /**
     * @description If true, the button color changes to blue and indicates its active state. Default false.
     */
    @Input()
    public inputIsActive:boolean;

    /**
     * @description If true, a triangular yellow flag appears at the upper right corner of the button to indicate, e.g.,
     * a state in which the button should be clicked by the user. Default false.
     */
    @Input()
    public inputIsFlagged:boolean;

    /**
     * @description If true, a none-clickable element is set to optically divide a vertical button group. Default false.
     */
    @Input()
    public inputIsDivider:boolean;

    /**
     * @description If true, the button will appear as a link which changes to blue on hover. Default false.
     */
    @Input()
    public inputIsLink:boolean;

    @Input()
    public inputIsHighlighted:boolean;

    /**
     * @description If true, the button gets full colored background (only for 'add' and 'delete' function group).
     * Default false
     */
    @Input()
    public inputIsMajor:boolean;

    @Output()
    public outputClicked:EventEmitter<Event> = new EventEmitter<Event>();

    constructor()
    {
        this.inputType = 'button';
        this.inputIsActive = false;
        this.inputIsFlagged = false;
        this.inputIsDivider = false;
        this.inputIsHidden = false;
        this.inputIsLink = false;
        this.inputIsDisabled = false;
        this.inputIsHighlighted = false;
        this.inputIsMajor = false;
    }

    public _click(event:Event):void
    {
        if(isNullOrUndefined(this.inputIsDisabled) || this.inputIsDisabled === false)
        {
            this.outputClicked.emit(event);
        }
    }
}
