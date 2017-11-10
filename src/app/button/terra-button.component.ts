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
    @Input() inputIsPrimary:boolean;
    @Input() inputIsSecondary:boolean;
    /**
     * @description If true, the button gets the tertiary color green. Default false.
     * */
    @Input() inputIsTertiary:boolean;
    @Input() inputIsSmall:boolean;
    @Input() inputIsLarge:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputCaption:string;
    @Input() inputIcon:string;
    /**
     * @description set the html native 'type' attribute e.g 'submit or 'reset'. Default 'button'.
     * */
    @Input() inputType:string;
    @Input() inputIsAlignRight:boolean;
    /**
     * @description if true, the button will be hidden. Default false.
     * */
    @Input() inputIsHidden:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right
    /**
     * @description if true, the button color changes to blue and indicates its active state. Default false.
     * */
    @Input() inputIsActive:boolean;
    /**
     * @description if true, a triangular yellow flag appears at the upper right corner of the button to indicate e.g. a state in which the button should be clicked by user. Default false.
     * */
    @Input() inputIsFlagged:boolean;
    /**
     * @description if true, a none clickable element is set to optically divide a vertical button group. Default false.
     * */
    @Input() inputIsDivider:boolean;
    /**
     * @description if true, the button will appear as a link, which coloured blue on hover. Default false.
     * */
    @Input() inputIsLink:boolean;
    @Input() inputIsHighlighted: boolean;
    @Output() outputClicked = new EventEmitter<Event>();

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
