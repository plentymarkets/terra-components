import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TerraFormFieldControlService } from '../service/terra-form-field-control.service';

/**
 * @author mfrank
 */
export class DynamicFormFunctionsHandler<D>
{
    /**
     * Called after valid form validation.
     *
     * @param formData
     */
    public saveCallback:(formData:D) => void;

    /**
     * Called after valid form validation and when a REST URL is set.
     *
     * @param observable
     */
    public savedCallback:(observable:Observable<D>) => void;

    /**
     * Called after invalid form validation.
     *
     * @param formGroup
     * @param translationMapping
     */
    public errorCallback:(formGroup:FormGroup, translationMapping:{ [key:string]:string }) => void;

    private _formFieldControlService?:TerraFormFieldControlService;

    constructor(saveCallback:(formData:D) => void,
                savedCallback:(observable:Observable<D>) => void,
                errorCallback:(formGroup:FormGroup, translationMapping:{ [key:string]:string }) => void)
    {
        this.saveCallback = saveCallback;
        this.savedCallback = savedCallback;
        this.errorCallback = errorCallback;
    }

    public update(formValues:D):void
    {
        this._formFieldControlService.updateDefaultValues(formValues);
    }

    public set formFieldControlService(formFieldControlService:TerraFormFieldControlService)
    {
        this._formFieldControlService = formFieldControlService;
    }
}
