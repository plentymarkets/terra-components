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
    /** @description If true, the button gets the primary color blue. Default false.*/
    @Input() inputIsPrimary:boolean;

    /** @description If true, the button gets the secondary color red. Default false.*/
    @Input() inputIsSecondary:boolean;

    /**
     * @description If true, the button gets the tertiary color green. Default false.
     * */
    @Input() inputIsTertiary:boolean;

    /** @description If true, the button will be small. Default false.*/
    @Input() inputIsSmall:boolean;

    /** @description If true, the button will be large. Default false.*/
    @Input() inputIsLarge:boolean;

    /** @description If true, the button will be disabled. Default false.*/
    @Input() inputIsDisabled:boolean;

    /** @description Set the caption.*/
    @Input() inputCaption:string;

    /** @description Set an icon (e.g. icon-save).*/
    @Input() inputIcon:string;
    /**
     * @description Set the html native 'type' attribute, e.g., 'submit or 'reset'. Default 'button'.
     * */
    @Input() inputType:string;

    /** @description  If true, the button will be aligned to the right side of another element. Default false.*/
    @Input() inputIsAlignRight:boolean;
    /**
     * @description If true, the button will be hidden. Default false.
     * */
    @Input() inputIsHidden:boolean;

    /** @description Set the tooltip.*/
    @Input() inputTooltipText:string;

    /** @description Set the tooltip placement (bottom, top, left, right). Default top.*/
    @Input() inputTooltipPlacement:string; //top, bottom, left, right

    /**
     * @description If true, the button color changes to blue and indicates its active state. Default false.
     * */
    @Input() inputIsActive:boolean;
    /**
     * @description If true, a triangular yellow flag appears at the upper right corner of the button to indicate, e.g., a state in which
     *     the button should be clicked by the user. Default false.
     * */
    @Input() inputIsFlagged:boolean;
    /**
     * @description If true, a none-clickable element is set to optically divide a vertical button group. Default false.
     * */
    @Input() inputIsDivider:boolean;
    /**
     * @description If true, the button will appear as a link which changes to blue on hover. Default false.
     * */
    @Input() inputIsLink:boolean;
    @Input() inputIsHighlighted:boolean;
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
