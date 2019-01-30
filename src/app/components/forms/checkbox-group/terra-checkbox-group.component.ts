import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraMultiCheckBoxValueInterface } from '../../forms/multi-check-box/data/terra-multi-check-box-value.interface';

@Component({
    selector:  'terra-checkbox-group',
    template:  require('./terra-checkbox-group.component.html'),
    styles:    [require('./terra-checkbox-group.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraCheckboxGroupComponent),
            multi:       true
        }
    ]
})
export class TerraCheckboxGroupComponent implements ControlValueAccessor
{
    /**
     * @description If true, the multi check box will be disabled. Default false.
     * */
    @Input()
    public inputIsDisabled:boolean;

    /**
     * @description If true, the multi check box will be disabled. Default false.
     * */
    @Input()
    public inputName:string;

    @Input()
    public inputCheckboxValues:Array<{ caption:string, value:any }> = [];

    protected values:Array<any> = [];

    protected multiCheckboxValues:Array<TerraMultiCheckBoxValueInterface> = [];

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public writeValue(values:Array<any>):void
    {
        this.values = values;
        this.updateMultiCheckboxValues();
    }

    protected onMultiCheckboxChanged(multicheckboxValues:Array<TerraMultiCheckBoxValueInterface>):void
    {
        multicheckboxValues.forEach((changedValue:TerraMultiCheckBoxValueInterface) =>
        {
            if(changedValue.selected)
            {
                this.values.push(changedValue.value);
            }
            else
            {
                let idx:number = this.values.indexOf(changedValue.value);
                if(idx >= 0)
                {
                    this.values.splice(idx, 1);
                }
            }
        });

        this.onChangeCallback(this.values);
        this.updateMultiCheckboxValues();
    }

    private updateMultiCheckboxValues():void
    {
        this.multiCheckboxValues = this.inputCheckboxValues.map((checkbox:{ caption:string, value:any }) =>
        {
            return {
                caption:  checkbox.caption,
                value:    checkbox.value,
                selected: this.values.indexOf(checkbox.value) >= 0
            };
        });
    }
}
