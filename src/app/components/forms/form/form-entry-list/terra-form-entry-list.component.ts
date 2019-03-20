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
    AbstractControl,
    ControlValueAccessor,
    FormArray,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Language } from 'angular-l10n';
import { TerraFormFieldHelper } from '../helper/terra-form-field.helper';

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
export class TerraFormEntryListComponent implements OnInit, ControlValueAccessor
{
    @Input()
    public inputFormField:TerraFormFieldInterface;

    @Input()
    public inputFormFieldKey:string;

    @Input()
    public inputFormGroup:FormGroup;

    // TODO: can be replaced by a hook in the ngOnChanges life cycle
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

    protected childScopes:Array<TerraFormScope> = [];

    private min:number;
    private max:number;

    private onChangeCallback:(value:any) => void = () => undefined;
    private onTouchedCallback:() => void = () => undefined;

    public ngOnInit():void
    {
        this.formArray = this.inputFormGroup.get(this.inputFormFieldKey) as FormArray;
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
                this.min = NaN;
                this.max = NaN;
            }
            this.fillRange(); // TODO: this throws an ExpressionChangedAfterItHasBeenCheckedError
        }

        this.formArray.controls.forEach((control:AbstractControl) =>
        {
            this.childScopes.push(this.inputScope.createChildScope(this.createChildScopeData(control.value)));
        });

        this.formArray.valueChanges.subscribe((values:Array<any>) =>
        {
            values.forEach((value:any, index:number) =>
            {
                this.onElementValueChanged(index, value);
            });
        });
    }

    protected get canAddElement():boolean
    {
        return isNaN(this.max) || this.formArray.length - 1 < this.max;
    }

    protected addElement():void
    {
        if(this.canAddElement)
        {
            let defaultValue:any = isNullOrUndefined(this.inputFormField.defaultValue) ? null : this.inputFormField.defaultValue;
            this.childScopes.push(this.inputScope.createChildScope(this.createChildScopeData(defaultValue)));
            let newControl:FormControl | FormGroup = isNullOrUndefined(this.inputFormField.children) ?
                new FormControl('', TerraFormFieldHelper.generateValidators(this.inputFormField)) :
                TerraFormFieldHelper.parseReactiveForm(this.inputFormField.children);
            this.formArray.push(newControl);
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

    protected fillRange():void
    {
        while(!isNaN(this.min) && this.min > this.formArray.length)
        {
            this.addElement();
        }
        while(!isNaN(this.max) && this.max < this.formArray.length)
        {
            this.removeElement(this.formArray.length - 1);
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
        this.fillRange();
    }
}
