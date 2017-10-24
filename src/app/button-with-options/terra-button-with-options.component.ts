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
    @Input() inputCaption:string;
    @Input() inputIcon:string;
    @Input() inputIsPrimary:boolean;
    @Input() inputIsSecondary:boolean;
    @Input() inputIsTertiary:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right

    // new inputs
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
