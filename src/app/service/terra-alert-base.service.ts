import {
    Language,
    TranslationService
} from 'angular-l10n';
import { FormGroup } from '@angular/forms';
import { TerraAlertComponent } from '../../';

/**
 * @author mhellige
 */
export class TerraAlertBaseService
{
    @Language()
    public lang:string;

    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(public translation:TranslationService)
    {
    }

    protected handleMessage(message:string, identifier?:string):void
    {
        this._alert.closeAlertByIdentifier(identifier);

        this._alert.addAlert({
            msg:              message,
            type:             'success',
            dismissOnTimeout: null,
            identifier:       identifier
        });
    }

    protected handleError(message:string, identifier?:string):void
    {
        this._alert.closeAlertByIdentifier(identifier);

        this._alert.addAlert({
            msg:              message,
            type:             'danger',
            dismissOnTimeout: 0,
            identifier:       identifier
        });
    }

    protected handleInfo(message:string, identifier?:string):void
    {
        this._alert.closeAlertByIdentifier(identifier);

        this._alert.addAlert({
            msg:              message,
            type:             'info',
            dismissOnTimeout: null,
            identifier:       identifier
        });
    }

    protected handleWarning(message:string, identifier?:string):void
    {
        this._alert.closeAlertByIdentifier(identifier);

        this._alert.addAlert({
            msg:              message,
            type:             'warning',
            dismissOnTimeout: null,
            identifier:       identifier
        });
    }

    protected formGroupErrorHandling(formGroup:FormGroup, translationMapping:{}):void
    {
        for(let control in formGroup.controls)
        {
            if(formGroup.controls.hasOwnProperty(control))
            {
                for(let error in formGroup.get(control).errors)
                {
                    if(formGroup.get(control).errors.hasOwnProperty(error))
                    {
                        switch(error)
                        {
                            case 'minvalue':
                                this.handleError(this.translation.translate('validation.errorMinValue', {
                                    formField: this.translation.translate(translationMapping[control]),
                                    minValue:  formGroup.get(control).errors[error].requiredLength
                                }));
                                break;
                            case 'maxvalue':
                                this.handleError(this.translation.translate('validation.errorMaxValue', {
                                    formField: this.translation.translate(translationMapping[control]),
                                    maxValue:  formGroup.get(control).errors[error].requiredLength
                                }));
                                break;
                            case 'required':
                                this.handleError(this.translation.translate('validation.errorRequired', {
                                    formField: this.translation.translate(translationMapping[control])
                                }));
                                break;
                            case 'requiredtrue':
                                this.handleError(this.translation.translate('validation.errorRequiredTrue', {
                                    formField: this.translation.translate(translationMapping[control])
                                }));
                                break;
                            case 'minlength':
                                this.handleError(this.translation.translate('validation.errorMinLength', {
                                    formField: this.translation.translate(translationMapping[control]),
                                    minLength: formGroup.get(control).errors[error].requiredLength
                                }));
                                break;
                            case 'email':
                                this.handleError(this.translation.translate('validation.errorEmail', {
                                    formField: this.translation.translate(translationMapping[control])
                                }));
                                break;
                            case 'maxlength':
                                this.handleError(this.translation.translate('validation.errorMaxLength', {
                                    formField: this.translation.translate(translationMapping[control]),
                                    maxLength: formGroup.get(control).errors[error].requiredLength
                                }));
                                break;
                        }
                    }
                }
            }
        }
    }
}
