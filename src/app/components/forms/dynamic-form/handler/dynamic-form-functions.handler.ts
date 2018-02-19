import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TerraFormFieldControlService } from "../service/terra-form-field-control.service";

/**
 * @author mfrank
 */
//export class DynamicFormFunctionsHandler<D>
export interface DynamicFormFunctionsHandler<D>
{
    /**
     * Called after valid form validation.
     *
     * @param formData
     */
    save:(formData:D) => void;

    /**
     * Called after valid form validation and when a REST URL is set.
     *
     * @param observable
     */
    saved:(observable:Observable<D>) => void;

    /**
     * Called after invalid form validation.
     *
     * @param formGroup
     * @param translationMapping
     */
    error:(formGroup:FormGroup, translationMapping:{ [key:string]:string }) => void;

    update?:(formData:D) => void;

    //private _formFieldControlService?:TerraFormFieldControlService;
    //
    //public update(formValues:D):void
    //{
    //    this._formFieldControlService.updateDefaultValues(formValues);
    //}
    //
    //public set formFieldControlService(formFieldControlService:TerraFormFieldControlService)
    //{
    //    this._formFieldControlService = formFieldControlService;
    //}
}
