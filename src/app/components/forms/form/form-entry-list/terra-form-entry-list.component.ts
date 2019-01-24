import {
    Component,
    EventEmitter,
    Host,
    Input,
    OnInit,
    Output,
    Type
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isArray,
    isNullOrUndefined,
    isString
} from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { FormArray } from '@angular/forms';
import { TerraFormContainerComponent } from '../../../../..';

@Component({
    selector: 'terra-form-entry-list',
    template: require('./terra-form-entry-list.component.html'),
    styles:   [require('./terra-form-entry-list.component.scss')]
})
export class TerraFormEntryListComponent implements OnInit
{
    private static itemCount:number = 0;

    @Input()
    public inputFormField:TerraFormFieldInterface;

    @Input()
    public inputFormFieldKey:string;

    @Input()
    public set inputFormValue(valueList:Array<any>)
    {
        if(isNullOrUndefined(valueList) || !isArray(valueList))
        {
            this.value = [];
            this.itemScopes = [];
            setTimeout(() =>
            {
                this.emitValue();
            });
        }
        else
        {
            if(!this.compareValues(valueList))
            {
                this.value = valueList.map((value:any) =>
                {
                    return {
                        key:   TerraFormEntryListComponent.itemCount++,
                        value: value
                    };
                });

                this.itemScopes = this.value.map((entry:{ key:number, value:any }) =>
                {
                    return this.inputScope.createChildScope(
                        this.createChildScopeData(entry.value)
                    );
                });
            }
        }
        this.fillRange();
    }

    @Input()
    public inputListRange:boolean | string;

    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public inputIsDisabled:boolean = false;

    @Output()
    public outputFormValueChanged:EventEmitter<any> = new EventEmitter<any>();

    public formArray:FormArray;

    protected min:number;
    protected max:number;

    private value:Array<{ key:number, value:any }> = [];

    private itemScopes:Array<TerraFormScope> = [];

    constructor(@Host() public formContainer:TerraFormContainerComponent)
    {
    }

    public ngOnInit():void
    {
        if(isString(this.inputListRange))
        {
            let match:RegExpExecArray = /^\[(\d*),(\d*)]$/.exec(this.inputListRange);
            if(match !== null)
            {
                this.min = parseInt(match[1], 10);
                this.max = parseInt(match[2], 10);
            }
            else
            {
                this.min = 1 / 0;   // NaN
                this.max = 1 / 0;   // NaN
            }
            this.fillRange();
        }

        this.formArray = new FormArray([]);

        this.formContainer.formGroup.addControl(this.inputFormFieldKey, this.formArray);
    }

    protected get canAddElement():boolean
    {
        return isNaN(this.max) || this.value.length - 1 < this.max;
    }

    protected addElement():void
    {
        if(this.canAddElement)
        {
            let defaultValue:any = isNullOrUndefined(this.inputFormField.defaultValue) ? null : this.inputFormField.defaultValue;
            this.value.push({
                key:   TerraFormEntryListComponent.itemCount++,
                value: defaultValue
            });
            this.itemScopes.push(
                this.inputScope.createChildScope(
                    this.createChildScopeData(defaultValue)
                )
            );
            this.emitValue();
        }
    }

    protected get canRemoveElement():boolean
    {
        return isNaN(this.min) || this.value.length > this.min;
    }

    protected removeElement(key:number):void
    {
        let index:number = this.value.findIndex((entry:{ key:number, value:any }) => entry.key === key);
        if(index < 0 || index > this.value.length)
        {
            return;
        }

        if(this.canRemoveElement)
        {
            this.value.splice(index, 1);
            this.itemScopes.splice(index, 1);
            this.formArray.removeAt(index);
            this.emitValue();
        }
    }

    protected fillRange():void
    {
        let defaultValue:any = !isNullOrUndefined(this.inputFormField) ? this.inputFormField.defaultValue : null;
        while(!isNaN(this.min) && this.min > this.value.length)
        {
            this.value.push({
                key:   TerraFormEntryListComponent.itemCount++,
                value: defaultValue
            });
            this.itemScopes.push(
                this.inputScope.createChildScope(this.createChildScopeData(defaultValue))
            );
        }
        while(!isNaN(this.max) && this.max < this.value.length)
        {
            this.value.pop();
        }
    }

    protected onElementValueChanged(key:number, value:any):void
    {
        let idx:number = this.value.findIndex((e:{ key:number, value:any }) => e.key === key);
        if(idx >= 0)
        {
            this.value[idx].value = value;
            this.itemScopes[idx].data = this.createChildScopeData(value);
            this.emitValue();
        }
    }

    protected trackByFn(index:number, item:{ key:number, value:any }):number
    {
        return item.key;
    }

    private emitValue():void
    {
        this.outputFormValueChanged.next(
            this.value.map((entry:{ key:number, value:any }) => entry.value)
        );
    }

    private compareValues(values:Array<any>):boolean
    {
        if(values.length !== this.value.length)
        {
            return false;
        }

        let valueEquals:boolean = true;
        this.value.forEach((entry:{ key:number, value:any }, index:number) =>
        {
            if(entry.value !== values[index])
            {
                valueEquals = false;
            }
        });

        return valueEquals;
    }

    private createChildScopeData(value:any):any
    {
        let loopKey:string = '$' + this.inputFormFieldKey;
        let childData:any = {};
        childData[loopKey] = value;

        return childData;
    }

}
