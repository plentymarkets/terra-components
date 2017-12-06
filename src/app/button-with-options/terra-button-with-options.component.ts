import {
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { TerraButtonInterface } from '../button/data/terra-button.interface';
import { isNullOrUndefined } from 'util';
import { TerraButtonComponent } from '../button/terra-button.component';

@Component({
    selector: 'terra-button-with-options',
    template: require('./terra-button-with-options.component.html'),
    styles:   [require('./terra-button-with-options.component.scss')]
})
export class TerraButtonWithOptionsComponent
{
    // terra button inputs
    /**
     * @description Set the caption.
     * */
    @Input() inputCaption:string;
    /**
     * @description Set an icon (e.g. icon-save).
     * */
    @Input() inputIcon:string;
    /**
     * @description If true, the button gets the primary color blue. Default false.
     * */
    @Input() inputIsPrimary:boolean;
    /**
     * @description If true, the button gets the secondary color red. Default false.
     * */
    @Input() inputIsSecondary:boolean;
    /**
     * @description If true, the button gets the tertiary color green. Default false.
     * */
    @Input() inputIsTertiary:boolean;
    /**
     * @description If true, the button will be disabled. Default false.
     * */
    @Input() inputIsDisabled:boolean;
    /**
     * @description Set the tooltip.
     * */
    @Input() inputTooltipText:string;
    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input() inputTooltipPlacement:string; //top, bottom, left, right

    // new inputs
    /**
     * @description Set an array of buttons which will be shown as a menu with options. Use the TerraButtonInterface to set the buttons of the menu.
     * */
    @Input() inputOptions:Array<TerraButtonInterface>;

    // view children
    @ViewChild(TerraButtonComponent) private toggleButton:TerraButtonComponent;

    private _optionsToggle:boolean;
    private clickListener:(event:Event) => void;

    constructor(private elementRef:ElementRef)
    {
        // define click listener
        this.clickListener = (event) =>
        {
            // check if it has been clicked elsewhere
            if(!this.elementRef.nativeElement.contains(event.target))
            {
                this._optionsToggle = false;
            }
        };
    }

    public ngOnInit():void
    {
        // handle undefined input error
        if(isNullOrUndefined(this.inputOptions))
        {
            this.inputOptions = [];
        }
    }

    private optionsClick(option:TerraButtonInterface):void
    {
        if(!option.isDisabled)
        {
            // execute click function of the option
            option.clickFunction();

            // close dropdown
            this.toggleOptions();
        }
    }

    private toggleOptions():void
    {
        if(!this._optionsToggle)
        {
            document.addEventListener('click', this.clickListener);
        }
        else
        {
            document.removeEventListener('click', this.clickListener);
        }

        this._optionsToggle = !this._optionsToggle;
    }
}
