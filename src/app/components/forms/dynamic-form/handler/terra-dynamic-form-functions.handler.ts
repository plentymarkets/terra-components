import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TerraFormFieldControlService } from '../service/terra-form-field-control.service';

/**
 * @author mfrank
 */
export class TerraDynamicFormFunctionsHandler<D>
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

    /**
     * Called after a form value has changed
     */
    public onValueChangedCallback:(value:any) => void;

    private _formFieldControlService?:TerraFormFieldControlService;

    constructor(saveCallback:(formData:D) => void,
                savedCallback:(observable:Observable<D>) => void,
                errorCallback:(formGroup:FormGroup, translationMapping:{ [key:string]:string }) => void,
                onValueChangedCallback:(value:any) => void)
    {
        this.saveCallback = saveCallback;
        this.savedCallback = savedCallback;
        this.errorCallback = errorCallback;
        this.onValueChangedCallback = onValueChangedCallback;
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
