import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector:  'terra-toggle',
    styles:    [require('./terra-toggle.component.scss')],
    template:  require('./terra-toggle.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraToggleComponent),
            multi:       true
        }
    ]
})
export class TerraToggleComponent implements ControlValueAccessor
{
    @Input()
    public inputIsSmall:boolean;

    @Input()
    public inputIsLarge:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputIcon:string;

    @Input()
    public inputIsAlignRight:boolean;

    @Input()
    public inputIsHidden:boolean;

    @Input()
    public inputTooltipText:string;

    @Input()
    public inputTooltipPlacement:TerraPlacementEnum;

    @Output()
    public deactivated:EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public activated:EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public toggled:EventEmitter<boolean> = new EventEmitter<boolean>();

    protected isActive:boolean = false;

    constructor()
    {
        this.inputTooltipPlacement = TerraPlacementEnum.TOP;
    }

    protected toggle():void
    {
        if(!this.inputIsDisabled)
        {
            this.isActive = !this.isActive;
            this.toggled.emit(this.isActive);
            this.onChangeCallback(this.isActive);
            if(this.isActive)
            {
                this.activated.emit();
            }
            else
            {
                this.deactivated.emit();
            }
        }
    }

    // From ControlValueAccessor interface
    public writeValue(value:boolean):void
    {
        if(value !== this.isActive)
        {
            this.isActive = value;
        }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn:(_:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
