import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TerraFormFieldControlService } from '../service/terra-form-field-control.service';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraDynamicFormFunctionsHandler<D> {
  /**
   * Called after valid form validation.
   *
   * @param formData
   */
  public saveCallback: (formData: D) => void;

  /**
   * Called after valid form validation and when a REST URL is set.
   *
   * @param observable
   */
  public savedCallback: (observable: Observable<D>) => void;

  /**
   * Called after invalid form validation.
   *
   * @param formGroup
   * @param translationMapping
   */
  public errorCallback: (
    formGroup: FormGroup,
    translationMapping: { [key: string]: string }
  ) => void;

  /**
   * Called after a form value has changed
   */
  public onValueChangedCallback: (value: any) => void;

  public valueChangeDebounce: number;

  private _formFieldControlService?: TerraFormFieldControlService;

  constructor(
    saveCallback: (formData: D) => void,
    savedCallback: (observable: Observable<D>) => void,
    errorCallback: (formGroup: FormGroup, translationMapping: { [key: string]: string }) => void,
    onValueChangedCallback: (value: any) => void,
    valueChangeDebounce: number = 1000
  ) {
    this.saveCallback = saveCallback;
    this.savedCallback = savedCallback;
    this.errorCallback = errorCallback;
    this.onValueChangedCallback = onValueChangedCallback;
    this.valueChangeDebounce = valueChangeDebounce;
  }

  public update(formValues: D): void {
    this._formFieldControlService.updateDefaultValues(formValues);
  }

  public set formFieldControlService(formFieldControlService: TerraFormFieldControlService) {
    this._formFieldControlService = formFieldControlService;
  }
}
