import {
    Component,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraMultiCheckBoxValueInterface } from '../multi-check-box/data/terra-multi-check-box-value.interface';
import { isNullOrUndefined, isArray } from 'util';
import { noop } from 'rxjs';

@Component({
    selector:    'tc-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrls:   ['./checkbox-group.component.scss'],
    providers:   [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: CheckboxGroupComponent,
            multi:       true
        }
    ]
})
export class CheckboxGroupComponent implements ControlValueAccessor
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


    public _multiCheckboxValues:Array<TerraMultiCheckBoxValueInterface> = [];

    private _values:Array<any>;
    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(_:Array<any>) => void = noop;

    public registerOnChange(fn:any):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this._onTouchedCallback = fn;
    }

    public writeValue(values:Array<any>):void
    {
        if(!isArray(values))
        {
            throw 'Value must be an array';
        }
        this._values = values;
        this._updateMultiCheckboxValues();
    }

    public _onMultiCheckboxChanged(checkboxValues:Array<TerraMultiCheckBoxValueInterface>):void
    {
        // if the value is null or undefined, initialize the array to be able to add selected values
        if(isNullOrUndefined(this._values))
        {
            this._values = [];
        }

        // go through the changed checkboxes
        (checkboxValues || []).forEach((changedValue:TerraMultiCheckBoxValueInterface) =>
        {
            if(changedValue.selected)
            {
                this._values.push(changedValue.value);
            }
            else
            {
                let idx:number = this._values.indexOf(changedValue.value);
                if(idx >= 0)
                {
                    this._values.splice(idx, 1);
                }
            }
        });

        // if nothing is selected, the value should be null
        if(this._values.length === 0)
        {
            this._values = null;
        }
        else
        {
            this._values.sort((a:any, b:any):number =>
            {
                let apos:number = this._multiCheckboxValues.findIndex((checkbox:TerraMultiCheckBoxValueInterface) =>
                {
                     return checkbox.value === a;
                });
                let bpos:number = this._multiCheckboxValues.findIndex((checkbox:TerraMultiCheckBoxValueInterface) =>
                {
                    return checkbox.value === b;
                });

                return apos - bpos;
            });
        }

        this._onChangeCallback(this._values);
        this._updateMultiCheckboxValues();
    }

    private _updateMultiCheckboxValues():void
    {
        this._multiCheckboxValues = this.checkboxValues.map((checkbox:{ caption:string, value:any }) =>
        {
            return {
                caption:  checkbox.caption,
                value:    checkbox.value,
                selected: (this._values || []).indexOf(checkbox.value) >= 0
            };
        });
    }
}
