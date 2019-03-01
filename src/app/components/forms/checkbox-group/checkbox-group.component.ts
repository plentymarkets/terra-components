import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraMultiCheckBoxValueInterface } from '../../forms/multi-check-box/data/terra-multi-check-box-value.interface';
import { isNullOrUndefined } from 'util';

@Component({
    selector:  'tc-checkbox-group',
    template:  require('./checkbox-group.component.html'),
    styles:    [require('./checkbox-group.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxGroupComponent),
            multi:       true
        }
    ]
})
export class CheckboxGroupComponent implements ControlValueAccessor, OnChanges
{
    /**
     * @description If true, the checkbox group will be disabled. Default false.
     **/
    @Input()
    public isDisabled:boolean = false;

    /**
     * @description The caption of the checkbox group
     **/
    @Input()
    public name:string;

    /**
     * @description List of available checkboxes of the group
     */
    @Input()
    public checkboxValues:Array<{ caption:string, value:any }> = [];

    /**
     * @description set the initial collapsed state.
     * @default false
     */
    @Input()
    public collapsed:boolean = false;

    protected values:Array<any>;

    protected multiCheckboxValues:Array<TerraMultiCheckBoxValueInterface> = [];

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:Array<any>) => void = (_:Array<any>):void => undefined;

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('checkboxValues'))
        {
            this.multiCheckboxValues = this.checkboxValues.map((box:{ caption:any, value:any }) =>
            {
                return {
                    caption:  box.caption,
                    value:    box.value,
                    selected: false
                };
            });
        }
    }

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

    protected onMultiCheckboxChanged(checkboxValues:Array<TerraMultiCheckBoxValueInterface>):void
    {
        // if the value is null or undefined, initialize the array to be able to add selected values
        if(isNullOrUndefined(this.values))
        {
            this.values = [];
        }

        // go through the changed checkboxes
        (checkboxValues || []).forEach((changedValue:TerraMultiCheckBoxValueInterface) =>
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

        // if nothing is selected, the value should be null
        if(this.values.length === 0)
        {
            this.values = null;
        }

        this.onChangeCallback(this.values);
    }

    private updateMultiCheckboxValues():void
    {
        if(!isNullOrUndefined(this.values))
        {
            this.values.forEach((value:any) =>
            {
                let checkbox:TerraMultiCheckBoxValueInterface = this.multiCheckboxValues.find((box:TerraMultiCheckBoxValueInterface) =>
                {
                    return box.value === value;
                });
                checkbox.selected = true;
            });
        }
    }
}
