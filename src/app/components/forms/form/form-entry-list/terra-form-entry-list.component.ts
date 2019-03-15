import {
    Component,
    forwardRef,
    Input,
    OnInit,
    Type
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isArray,
    isNullOrUndefined,
    isString
} from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';
import {
    ControlValueAccessor,
    FormArray,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Language } from 'angular-l10n';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';

@Component({
    selector: 'terra-form-entry-list',
    template: require('./terra-form-entry-list.component.html'),
    styles:   [require('./terra-form-entry-list.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFormEntryListComponent),
            multi:       true
        }
    ]
})
export class TerraFormEntryListComponent implements OnInit, ControlValueAccessor
{
    @Input()
    public inputFormField:TerraFormFieldInterface;

    @Input()
    public inputFormFieldKey:string;

    @Input()
    public inputFormGroup:FormGroup;

    @Input()
    public inputListRange:boolean | string;

    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public inputIsDisabled:boolean = false;

    public formArray:FormArray;

    @Language()
    protected lang:string;

    protected min:number;
    protected max:number;

    private value:Array<any> = [];

    private itemScopes:Array<TerraFormScope> = [];

    private onChangeCallback:(value:any) => void = () => undefined;
    private onTouchedCallback:() => void = () => undefined;

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

        // this.inputFormGroup.setControl(this.inputFormFieldKey, this.formArray);
        this.formArray = this.inputFormGroup.get(this.inputFormFieldKey) as FormArray;

        // this.formArray.valueChanges.subscribe((value:any) => this.onChangeCallback(value));
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
            this.value.push(defaultValue);
            this.itemScopes.push(
                this.inputScope.createChildScope(
                    this.createChildScopeData(defaultValue)
                )
            );
            this.formArray.push(new FormControl('', TerraFormFieldHelper.generateValidators(this.inputFormField)));
        }
    }

    protected get canRemoveElement():boolean
    {
        return isNaN(this.min) || this.value.length > this.min;
    }

    protected removeElement(index:number):void
    {
        if(index < 0 || index > this.value.length)
        {
            return;
        }

        if(this.canRemoveElement)
        {
            this.value.splice(index, 1);
            this.itemScopes.splice(index, 1);
            this.formArray.removeAt(index);
        }
    }

    protected fillRange():void
    {
        while(!isNaN(this.min) && this.min > this.value.length)
        {
            this.addElement();
        }
        while(!isNaN(this.max) && this.max < this.value.length)
        {
            this.removeElement(this.value.length - 1);
        }
    }

    protected onElementValueChanged(key:number, value:any):void
    {
        let idx:number = this.value.findIndex((e:{ key:number, value:any }) => e.key === key);
        if(idx >= 0)
        {
            this.value[idx].value = value;
            this.itemScopes[idx].data = this.createChildScopeData(value);
        }
    }

    protected trackByFn(index:number):number
    {
        return index;
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

    public registerOnChange(fn:(value:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled:boolean):void
    {
        // TODO
    }

    public writeValue(value:Array<any>):void
    {
        if(isNullOrUndefined(value) || !isArray(value))
        {
            this.formArray = new FormArray([]);
            this.formArray.setValue([]);
            this.value = [];
            this.itemScopes = [];
        }
        else
        {
            if(this.value.length > this.formArray.length)
            {
                this.value.forEach((val:any, index:number) =>
                {
                    if(!this.formArray.at(index))
                    {
                        this.formArray.insert(index, new FormControl(val, TerraFormFieldHelper.generateValidators(this.inputFormField)));
                    }
                });
            }
            else if(this.value.length < this.formArray.length)
            {
                this.formArray.controls.forEach((control:FormControl, index:number) =>
                {
                    if(!this.value[index])
                    {
                        this.formArray.removeAt(index);
                    }
                });
            }

            this.formArray.patchValue(value);
            this.value = value;

            this.itemScopes = this.value.map((val:any) =>
            {
                return this.inputScope.createChildScope(this.createChildScopeData(val));
            });

        }
        this.fillRange();
    }

}
