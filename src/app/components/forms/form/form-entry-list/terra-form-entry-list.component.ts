import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    SimpleChanges,
    Type
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isArray,
    isNullOrUndefined
} from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';
import {
    AbstractControl,
    ControlValueAccessor,
    FormArray,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Language } from 'angular-l10n';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';
import { noop } from 'rxjs/util/noop';
import { TerraFormHelper } from '../helper/terra-form.helper';

@Component({
    selector:  'terra-form-entry-list',
    template:  require('./terra-form-entry-list.component.html'),
    styles:    [require('./terra-form-entry-list.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFormEntryListComponent),
            multi:       true
        }
    ]
})
export class TerraFormEntryListComponent implements OnChanges, ControlValueAccessor
{
    @Input()
    public inputFormField:TerraFormFieldInterface;

    @Input()
    public inputFormFieldKey:string;

    @Input()
    public inputFormGroup:FormGroup;

    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public inputIsDisabled:boolean = false;

    public formArray:FormArray;

    @Language()
    protected lang:string;

    protected childScopes:Array<TerraFormScope> = [];

    private min:number;
    private max:number;

    private onChangeCallback:(value:any) => void = noop;
    private onTouchedCallback:() => void = noop;

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputFormGroup') || changes.hasOwnProperty('inputFormFieldKey'))
        {
            this.formArray = this.inputFormGroup.get(this.inputFormFieldKey) as FormArray;
            this.childScopes = this.formArray.controls.map((control:AbstractControl) =>
            {
                return this.inputScope.createChildScope(this.createChildScopeData(control.value));
            });

            this.formArray.valueChanges.subscribe((values:Array<any>) =>
            {
                values.forEach((value:any, index:number) =>
                {
                    this.onElementValueChanged(index, value);
                });
            });
        }

        if(changes.hasOwnProperty('inputFormField'))
        {
            let range:[number, number] = TerraFormFieldHelper.getListRange(this.inputFormField.isList);
            this.min = range[0];
            this.max = range[1];
        }
    }

    protected get canAddElement():boolean
    {
        return isNaN(this.max) || this.formArray.length < this.max;
    }

    protected addElement():void
    {
        if(this.canAddElement)
        {
            let defaultValue:any = isNullOrUndefined(this.inputFormField.defaultValue) ? null : this.inputFormField.defaultValue;
            this.childScopes.push(this.inputScope.createChildScope(this.createChildScopeData(defaultValue)));
            this.formArray.push(TerraFormHelper.createNewControl(this.inputFormField.defaultValue, this.inputFormField));
        }
    }

    protected get canRemoveElement():boolean
    {
        return isNaN(this.min) || this.formArray.length > this.min;
    }

    protected removeElement(index:number):void
    {
        if(index < 0 || index > this.formArray.length)
        {
            return;
        }

        if(this.canRemoveElement)
        {
            this.childScopes.splice(index, 1);
            this.formArray.removeAt(index);
        }
    }

    protected onElementValueChanged(idx:number, value:any):void
    {
        // TODO: implement
        if(!isNullOrUndefined(this.childScopes[idx]))
        {
            this.childScopes[idx].data = this.createChildScopeData(value);
        }
        else
        {
            this.childScopes[idx] = this.inputScope.createChildScope(this.createChildScopeData(value));
        }
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

    public writeValue(value:Array<any>):void
    {
        if(isNullOrUndefined(value) || !isArray(value))
        {
            this.formArray = new FormArray([]);
            this.formArray.setValue([]);
            this.childScopes = [];
        }
        else
        {
            this.formArray.patchValue(value);

            this.childScopes = this.formArray.controls.map((control:FormControl) =>
            {
                return this.inputScope.createChildScope(this.createChildScopeData(control.value));
            });

        }
    }
}
