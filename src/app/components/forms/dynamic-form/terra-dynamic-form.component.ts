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

export enum TerraHtmlMethods
{
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export interface TerraDynamicFormRequestParams
{
    route:string;
    htmlMethod:TerraHtmlMethods;
    params?:{};
}

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
    @Input() public inputRequestParams:TerraDynamicFormRequestParams;

    constructor(private _formFieldControlService:TerraFormFieldControlService,
                private _dynamicService:TerraDynamicFormService)
    {
        this.inputPortletStyle = 'col-xs-12 col-md-4';
        this.inputRequestParams = {
            route:      '',
            htmlMethod: null,
            params:     {}
        };
    }

    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputFormFields) || isNullOrUndefined(this.inputFormFunctions))
        {
            console.error('inputFormFields and inputFormFunctions must be set.');
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
            this.inputFormFunctions.save(this._formFieldControlService.dynamicFormGroup.value);
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
