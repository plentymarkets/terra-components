import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraFormFieldControlService } from './service/terra-form-field-control.service';
import { TerraFormFieldBase } from './data/terra-form-field-base';
import { DynamicFormFunctionsHandler } from './handler/dynamic-form-functions.handler';
import { TerraDynamicFormService } from './service/terra-dynamic-form.service';
import { TerraDatePickerComponent } from '../input/date-picker/terra-date-picker.component';


/**
 * @author mfrank
 */
@Component({
    selector:  'terra-dynamic-form',
    template:  require('./terra-dynamic-form.component.html'),
    providers: [TerraDynamicFormService]
})
export class TerraDynamicFormComponent implements OnInit, OnChanges
{
    @Input() public inputFormFunctions:DynamicFormFunctionsHandler<any>;
    @Input() public inputFormFields:Array<TerraFormFieldBase<any>>;
    @Input() public inputPortletStyle:string;
    @Input() public inputRestRoute:string;

    constructor(private _formFieldControlService:TerraFormFieldControlService,
                private _dynamicService:TerraDynamicFormService)
    {
        this.inputPortletStyle = 'col-xs-12 col-md-4';
        this.inputRestRoute = '';
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputFormFields) || isNullOrUndefined(this.inputFormFunctions))
        {
            console.error('inputFormStructure and inputFormFunctions must be set.');
        }
        else
        {
            this._formFieldControlService.createFormGroup(this.inputFormFields);
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputFormFields'])
        {
            this._formFieldControlService.createFormGroup(this.inputFormFields);
        }
    }

    private validate():void
    {
        if(this._formFieldControlService.dynamicFormGroup.valid)
        {
            if(this.inputRestRoute !== '')
            {
                this.inputFormFunctions.saved(this._dynamicService.create(this._formFieldControlService.dynamicFormGroup.value,
                    this.inputRestRoute));
            }
            else
            {
                this.inputFormFunctions.save(this._formFieldControlService.dynamicFormGroup.value);
            }
        }
        else
        {
            this.inputFormFunctions.error(this._formFieldControlService.dynamicFormGroup, this._formFieldControlService.translationMapping);
        }
    }

    private onResetClick():void
    {
        this._formFieldControlService.resetForm();
    }
}
