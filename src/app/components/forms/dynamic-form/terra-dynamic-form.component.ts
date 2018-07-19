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
import { TerraDynamicFormFunctionsHandler } from './handler/terra-dynamic-form-functions.handler';
import { TerraDynamicFormService } from './service/terra-dynamic-form.service';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators';

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
    styles:    [require('./terra-dynamic-form.component.scss')],
    providers: [TerraDynamicFormService]
})
export class TerraDynamicFormComponent implements OnInit, OnChanges
{
    @Input()
    public inputFormFunctions:TerraDynamicFormFunctionsHandler<any>;

    @Input()
    public inputFormFields:Array<TerraFormFieldBase<any>>;

    @Input()
    public inputPortletStyle:string;

    @Input()
    public inputRequestParams:TerraDynamicFormRequestParams;

    @Input()
    public inputHasNoSaveButton:boolean;

    @Input()
    public inputHasNoResetButton:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputUsePortlet:boolean = true;

    constructor(private _formFieldControlService:TerraFormFieldControlService)
    {
        this.inputPortletStyle = 'col-xs-12 col-md-8 col-lg-5';
        this.inputRequestParams = {
            route:      '',
            htmlMethod: null,
            params:     {}
        };

        this.inputHasNoSaveButton = false;
        this.inputHasNoResetButton = false;
        this.inputIsDisabled = false;
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
            this.inputFormFunctions.formFieldControlService = this._formFieldControlService;

            this.registerValueChange();
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputFormFields'])
        {
            this._formFieldControlService.createFormGroup(this.inputFormFields);
            this.registerValueChange();
        }
    }

    protected validate():void
    {
        if(this._formFieldControlService.dynamicFormGroup.valid)
        {
            this.inputFormFunctions.saveCallback(this._formFieldControlService.dynamicFormGroup.value);
        }
        else
        {
            this.inputFormFunctions.errorCallback(this._formFieldControlService.dynamicFormGroup,
                this._formFieldControlService.translationMapping);
        }
    }

    protected onResetClick():void
    {
        this._formFieldControlService.resetForm();
    }

    private registerValueChange():void
    {
        if(!isNullOrUndefined(this.inputFormFunctions.onValueChangedCallback))
        {
            let stream:Observable<any> = this._formFieldControlService
                .dynamicFormGroup
                .valueChanges;

            if(this.inputFormFunctions.valueChangeDebounce > 0)
            {
                stream = stream.pipe(
                    debounceTime(this.inputFormFunctions.valueChangeDebounce)
                );
            }

            stream.subscribe((value:any) =>
            {
                this.inputFormFunctions.onValueChangedCallback(value);
            });
        }
    }
}
