import {
    Component,
    OnInit
} from '@angular/core';
import {
    TerraDynamicFormFunctionsHandler,
    TerraFormFieldBase,
    TerraFormFieldInputText,
    TerraFormFieldVerticalContainer
} from '../../../../../';
import { TerraAlertBaseService } from '../../../../service/terra-alert-base.service';
import { TranslationService } from 'angular-l10n';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export interface DynamicFormExampleInterface
{
    firstName:string;
    lastName:string;
}

@Component({
    selector: 'terra-dynamic-form-example',
    styles:   [require('./terra-dynamic-form.component.example.scss')],
    template: require('./terra-dynamic-form.component.example.html'),
})
export class TerraDynamicFormComponentExample extends TerraAlertBaseService implements OnInit
{
    protected formStructure:Array<TerraFormFieldBase<any>> = [];
    protected formFunctions:TerraDynamicFormFunctionsHandler<DynamicFormExampleInterface>;

    constructor(public translation:TranslationService)
    {
        super(translation);
    }

    public ngOnInit():void
    {
        this.initFormFunctions();
        this.initFormFields();
    }

    private initFormFields():void
    {
        let formFields:Array<TerraFormFieldBase<any>> = [];
        formFields.push(new TerraFormFieldVerticalContainer(
            'firstName',
            'Firstname',
            {
                containerEntries: [
                    new TerraFormFieldInputText(
                        'firstName',
                        'Enter firstname',
                        false,
                    ),
                ]
            }));
        formFields.push(new TerraFormFieldVerticalContainer(
            'lastName',
            'Lastname',
            {
                containerEntries: [
                    new TerraFormFieldInputText(
                        'lastName',
                        'Enter lastname',
                        false,
                    ),
                ]
            }));
        this.formStructure = formFields;
    }

    private initFormFunctions():void
    {
        this.formFunctions = new TerraDynamicFormFunctionsHandler((formData:DynamicFormExampleInterface):void =>
                this.saveDataCleanupConfig(formData),
            null,
            (formGroup:FormGroup, translationMapping:{ [key:string]:string }):void =>
            {
                this.formGroupErrorHandling(formGroup, translationMapping);
            },
            null
        );
    }

    private saveDataCleanupConfig(formData:DynamicFormExampleInterface):void
    {
        if(!isNullOrUndefined(formData))
        {
            this.handleMessage('Successfully saved');
        }
        else
        {
            this.handleError('Saving failed');
        }

    }

}
