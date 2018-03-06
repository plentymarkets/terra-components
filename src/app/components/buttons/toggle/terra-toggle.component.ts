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
import { TerraPlacementEnum } from '../../../../';

export const TOGGLE_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraToggleComponent),
    multi:       true
};

@Component({
    selector:  'terra-toggle',
    styles:    [require('./terra-toggle.component.scss')],
    template:  require('./terra-toggle.component.html'),
    providers: [TOGGLE_CONTROL_VALUE_ACCESSOR]
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

    private _isActive:boolean = false;

    constructor()
    {
        this.inputTooltipPlacement = TerraPlacementEnum.TOP;
    }

    private toggle():void
    {
        if(!this.inputIsDisabled)
        {
            this._isActive = !this._isActive;
            this.toggled.emit(this._isActive);
            this.onChangeCallback(this._isActive);
            if(this._isActive)
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
        if(value !== this._isActive)
        {
            this._isActive = value;
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
