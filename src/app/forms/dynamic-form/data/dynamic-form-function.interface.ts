import { FormGroup } from '@angular/forms';

/**
 * @author mfrank
 */
export interface DynamicFormFunctionInterface<D>
{
    save:(formData:D) => void;
    error:(formGroup:FormGroup, translationMapping:{ [key:string]:string }) => void;
}
