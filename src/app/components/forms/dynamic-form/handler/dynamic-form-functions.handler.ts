import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

/**
 * @author mfrank
 */
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
}
