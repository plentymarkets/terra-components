import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { TerraButtonInterface } from '../button/data/terra-button.interface';
import { isNullOrUndefined } from 'util';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraTextAlignEnum } from '../../tables/data-table/enums/terra-text-align.enum';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector:    'terra-button-with-options',
    templateUrl: './terra-button-with-options.component.html',
    styleUrls:   ['./terra-button-with-options.component.scss']
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
     * @description If true, the button will be small. Default false.
     */
    @Input()
    public inputIsSmall:boolean;

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

    /**
     * @description Emits the state of the button options each time the options are toggled.
     */
    @Output()
    public optionsToggled:EventEmitter<boolean> = new EventEmitter<boolean>();

    public _optionsToggle:boolean;
    public _alignRight:boolean;

    // view children
    @ViewChild(TerraButtonComponent, { static: true })
    private _toggleButton:TerraButtonComponent;

    private readonly _clickListener:(event:Event) => void;

    constructor(private _elementRef:ElementRef)
    {
        // define click listener
        this._clickListener = (event:Event):void =>
        {
            // check if it has been clicked elsewhere
            if(!this._elementRef.nativeElement.contains(event.target))
            {
                this._optionsToggle = false;
                this.optionsToggled.emit(false);
            }
        };

        this.inputOptionsAlignment = TerraTextAlignEnum.RIGHT;
        this._alignRight = true;
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
                this._alignRight = false;
                break;
            }
            case TerraTextAlignEnum.RIGHT:
            {
                this._alignRight = true;
                break;
            }
            case TerraTextAlignEnum.CENTER:
            {
                this._alignRight = false;
                break;
            }
        }
    }

    public _optionsClick(option:TerraButtonInterface):void
    {
        if(!option.isDisabled)
        {
            // execute click function of the option
            option.clickFunction();

            // close dropdown
            this._toggleOptions();
        }
    }

    public _toggleOptions(event?:Event):void
    {
        if(!isNullOrUndefined(event))
        {
            event.stopPropagation();
        }

        if(!this._optionsToggle)
        {
            document.addEventListener('click', this._clickListener);
        }
        else
        {
            document.removeEventListener('click', this._clickListener);
        }

        this._optionsToggle = !this._optionsToggle;
        this.optionsToggled.emit(this._optionsToggle);
    }
}
