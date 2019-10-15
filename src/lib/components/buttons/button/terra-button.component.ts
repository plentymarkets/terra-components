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
    public _inputIsSmall:boolean;

    /** @description If true, the button will be large. Default false.*/
    @Input()
    public _inputIsLarge:boolean;

    /** @description If true, the button will be disabled. Default false.*/
    @Input()
    public _inputIsDisabled:boolean;

    /** @description Set the caption.*/
    @Input()
    public _inputCaption:string;

    /** @description Set an icon (e.g. icon-save).*/
    @Input()
    public _inputIcon:string;

    /** @description Set the html native 'type' attribute, e.g., 'submit or 'reset'. Default 'button'.*/
    @Input()
    public _inputType:string;

    /** @description  If true, the button will be aligned to the right side of another element. Default false.*/
    @Input()
    public _inputIsAlignRight:boolean;

    /** @description If true, the button will be hidden. Default false.*/
    @Input()
    public _inputIsHidden:boolean;

    /** @description Set the tooltip.*/
    @Input()
    public _inputTooltipText:string;

    /**
     * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input()
    public _inputTooltipPlacement:TerraPlacementEnum;

    /**
     * @description If true, the button color changes to blue and indicates its active state. Default false.
     */
    @Input()
    public _inputIsActive:boolean;

    /**
     * @description If true, a triangular yellow flag appears at the upper right corner of the button to indicate, e.g.,
     * a state in which the button should be clicked by the user. Default false.
     */
    @Input()
    public _inputIsFlagged:boolean;

    /**
     * @description If true, a none-clickable element is set to optically divide a vertical button group. Default false.
     */
    @Input()
    public _inputIsDivider:boolean;

    /**
     * @description If true, the button will appear as a link which changes to blue on hover. Default false.
     */
    @Input()
    public _inputIsLink:boolean;

    @Input()
    public _inputIsHighlighted:boolean;

    /**
     * @description If true, the button gets full colored background (only for 'add' and 'delete' function group).
     * Default false
     */
    @Input()
    public _inputIsMajor:boolean;

    @Output()
    public outputClicked:EventEmitter<Event> = new EventEmitter<Event>();

    constructor()
    {
        this._inputType = 'button';
        this._inputIsActive = false;
        this._inputIsFlagged = false;
        this._inputIsDivider = false;
        this._inputIsHidden = false;
        this._inputIsLink = false;
        this._inputIsDisabled = false;
        this._inputIsHighlighted = false;
        this._inputIsMajor = false;
    }

    protected click(event:Event):void
    {
        if(isNullOrUndefined(this._inputIsDisabled) || this._inputIsDisabled === false)
        {
            this.outputClicked.emit(event);
        }
    }
}
