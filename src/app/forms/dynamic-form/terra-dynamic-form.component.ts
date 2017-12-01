import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { TerraFormFieldControlService } from './service/terra-form-field-control.service';
import { TerraFormFieldBaseBean } from './data/terra-form-field-base.bean';
import { DynamicFormFunctionInterface } from './data/dynamic-form-function.interface';
import { TerraFormGroupHelper } from './data/terra-form-group-helper';


/**
 * @author mfrank
 */
@Component({
    selector: 'terra-dynamic-form',
    template: require('./terra-dynamic-form.component.html')
})
export class TerraDynamicFormComponent implements OnInit
{
    @Input() public inputFormFunctions:DynamicFormFunctionInterface<any>;
    @Input() public inputFormFields:Array<TerraFormFieldBaseBean<any>>;
    @Input() public inputPortletStyle:string;

    private _translationMapping:{} = {};
    private _dynamicFormGroup:FormGroup;
    private _defaultValues:{ [key:string]:string | number | boolean } = {};

    constructor(private _formFieldControlService:TerraFormFieldControlService)
    {
        this.inputPortletStyle = 'col-xs-12 col-md-4';
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputFormFields) || isNullOrUndefined(this.inputFormFunctions))
        {
            console.error('inputFormStructure and inputFormFunctions must be set.');
        }
        else
        {
            let fgh:TerraFormGroupHelper = this._formFieldControlService.initFormGroupHelper(this.inputFormFields);
            this._dynamicFormGroup = this._formFieldControlService.createFormGroup(fgh);
            this._translationMapping = fgh.translationMapping;
            this._defaultValues = fgh.defaultValues;
        }
    }

    private validate():void
    {
        if(this._dynamicFormGroup.valid)
        {
            this.inputFormFunctions.save(this._dynamicFormGroup.value);
        }
        else
        {
            this.inputFormFunctions.error(this._dynamicFormGroup, this._translationMapping);
        }
    }

    private onResetClick():void
    {
        this._dynamicFormGroup.reset(this._defaultValues);
    }
}
