import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-button',
    styles:   [require('./terra-button.component.scss')],
    template: require('./terra-button.component.html')
})
export class TerraButtonComponent
{
    @Input()
    public inputIsPrimary:boolean;

    @Input()
    public inputIsSecondary:boolean;

    /**
     * @description If true, the button gets the tertiary color green. Default false.
     */
    @Input()
    public inputIsTertiary:boolean;

    @Input()
    public inputIsSmall:boolean;

    @Input()
    public inputIsLarge:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputCaption:string;

    @Input()
    public inputIcon:string;

    /**
     * @description Set the html native 'type' attribute, e.g., 'submit or 'reset'. Default 'button'.
     */
    @Input()
    public inputType:string;

    @Input()
    public inputIsAlignRight:boolean;

    /**
     * @description If true, the button will be hidden. Default false.
     */
    @Input()
    public inputIsHidden:boolean;

    @Input()
    public inputTooltipText:string;

    @Input()
    public inputTooltipPlacement:string; // top, bottom, left, right
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

    @Output()
    public outputClicked:EventEmitter<Event> = new EventEmitter<Event>();

    constructor()
    {
        this.inputTooltipPlacement = 'top';
        this.inputType = 'button';
        this.inputIsActive = false;
        this.inputIsFlagged = false;
        this.inputIsDivider = false;
        this.inputIsHidden = false;
        this.inputIsLink = false;
        this.inputIsDisabled = false;
        this.inputIsHighlighted = false;
    }

    private click(event:Event):void
    {
        if(isNullOrUndefined(this.inputIsDisabled) || this.inputIsDisabled === false)
        {
            this.outputClicked.emit(event);
        }
    }
}
