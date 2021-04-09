import {
    Component,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { NumberInputInterface } from './number-input.interface';

@Component({
    selector:    'number-input',
    templateUrl: './number-input.component.html',
    providers:   [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: NumberInputComponent,
            multi:       true
        }
    ]
})
export class NumberInputComponent implements ControlValueAccessor, NumberInputInterface
{
    @Input()
    public emptyMessage:string;

    @Input()
    public invalidMessage:string;

    @Input()
    public isDisabled:boolean;

    @Input()
    public isRequired:boolean;

    @Input()
    public maxLength:number;

    @Input()
    public maxValue:number;

    @Input()
    public minLength:number;

    @Input()
    public minValue:number;

    @Input()
    public name:string;

    @Input()
    public tooltipPlacement:string;

    @Input()
    public tooltipText:string;

    constructor(private _inputRegex:string)
    {
        this.regex = _inputRegex;
        this.isValid = true;
        this.inputIsSmall = false;
    }


    public registerOnChange(fn:any):void
    {
    }

    public registerOnTouched(fn:any):void
    {
    }

    public writeValue(obj:any):void
    {
    }


}
