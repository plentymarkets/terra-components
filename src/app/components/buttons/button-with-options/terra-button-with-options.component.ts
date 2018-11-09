import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraButtonInterface } from '../button/data/terra-button.interface';
import { isNullOrUndefined } from 'util';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraTextAlignEnum } from '../../tables/data-table/cell/terra-text-align.enum';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-button-with-options',
    template: require('./terra-button-with-options.component.html'),
    styles:   [require('./terra-button-with-options.component.scss')]
})
export class TerraButtonWithOptionsComponent implements OnInit
{
    // terra button inputs
    /**
     * @description Set the caption.
     */
    @Input()
    public inputCaption:string;

    /**
     * @description Set an icon (e.g. icon-save).
     */
    @Input()
    public inputIcon:string;

    /**
     * @description If true, the button gets the primary color blue. Default false.
     * @deprecated The button color depends on the input icon. Each icon has its own fixed color.
     */
    @Input()
    public inputIsPrimary:boolean;

    /**
     * @description If true, the button gets the secondary color red. Default false.
     * @deprecated The button color depends on the input icon. Each icon has its own fixed color.
     */
    @Input()
    public inputIsSecondary:boolean;

    /**
     * @description If true, the button gets the tertiary color green. Default false.
     * @deprecated The button color depends on the input icon. Each icon has its own fixed color.
     */
    @Input()
    public inputIsTertiary:boolean;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled:boolean;

    /**
     * @description Set the tooltip.
     */
    @Input()
    public inputTooltipText:string;
    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     */
    @Input()
    public inputTooltipPlacement:TerraPlacementEnum; // top, bottom, left, right

    // new inputs
    /**
     * @description Set an array of buttons which will be shown as a menu with options. Use the TerraButtonInterface to set the buttons of
     *     the menu.
     */
    @Input()
    public inputOptions:Array<TerraButtonInterface>;

    /**
     * @description Set the alignment of the context menu. Default right.
     */
    @Input()
    public inputOptionsAlignment:TerraTextAlignEnum;

    protected optionsToggle:boolean;
    protected alignRight:boolean;

    // view children
    @ViewChild(TerraButtonComponent)
    private toggleButton:TerraButtonComponent;

    private clickListener:(event:Event) => void;

    constructor(private elementRef:ElementRef)
    {
        // define click listener
        this.clickListener = (event:Event):void =>
        {
            // check if it has been clicked elsewhere
            if(!this.elementRef.nativeElement.contains(event.target))
            {
                this.optionsToggle = false;
            }
        };

        this.inputOptionsAlignment = TerraTextAlignEnum.RIGHT;
        this.alignRight = true;
    }

    public ngOnInit():void
    {
        // handle undefined input error
        if(isNullOrUndefined(this.inputOptions))
        {
            this.inputOptions = [];
        }

        switch(this.inputOptionsAlignment)
        {
            case TerraTextAlignEnum.LEFT:
            {
                this.alignRight = false;
                break;
            }
            case TerraTextAlignEnum.RIGHT:
            {
                this.alignRight = true;
                break;
            }
            case TerraTextAlignEnum.CENTER:
            {
                this.alignRight = false;
                break;
            }
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
        if(!this.optionsToggle)
        {
            document.addEventListener('click', this.clickListener);
        }
        else
        {
            document.removeEventListener('click', this.clickListener);
        }

        this.optionsToggle = !this.optionsToggle;
    }
}
