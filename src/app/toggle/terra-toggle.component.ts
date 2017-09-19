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
    @Input() inputIsSmall:boolean;
    @Input() inputIsLarge:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputIcon:string;
    @Input() inputIsAlignRight:boolean;
    @Input() inputIsHidden:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right

    @Output() deactivated = new EventEmitter<any>();
    @Output() activated = new EventEmitter<any>();
    @Output() toggled = new EventEmitter<boolean>();

    private _isActive:boolean = false;

    private onTouchedCallback:() => void = () =>
    {
    };

    private onChangeCallback:(_:any) => void = () =>
    {
    };

    constructor()
    {
        this.inputTooltipPlacement = 'top';
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

    //From ControlValueAccessor interface
    writeValue(value:boolean)
    {
        if(value !== this._isActive)
        {
            this._isActive = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn:any)
    {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn:any)
    {
        this.onTouchedCallback = fn;
    }
}
