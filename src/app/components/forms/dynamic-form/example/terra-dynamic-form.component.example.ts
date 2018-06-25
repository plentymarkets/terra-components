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
import { TranslationService } from 'angular-l10n';
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
export class TerraDynamicFormComponentExample implements OnInit
{
    protected formStructure:Array<TerraFormFieldBase<any>> = [];
    protected formFunctions:TerraDynamicFormFunctionsHandler<DynamicFormExampleInterface>;

    constructor(public translation:TranslationService)
    {
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
            'customerData',
            'Contact',
            {
                containerEntries: [
                    new TerraFormFieldInputText(
                        'firstName',
                        'Enter firstname',
                        false,
                        {
                            defaultValue: 'Max'
                        }
                    ),
                    new TerraFormFieldInputText(
                        'lastName',
                        'Enter lastname',
                        false,
                        {
                            defaultValue: 'Mustermann'
                        }
                    )
                ]
            }));
        this.formStructure = formFields;
    }

    private initFormFunctions():void
    {
        this.formFunctions = new TerraDynamicFormFunctionsHandler((formData:DynamicFormExampleInterface):void =>
                this.saveDataCleanupConfig(formData),
            null,
            ():void =>
            {
                alert('Error');
            },
            null
        );
    }

    private saveDataCleanupConfig(formData:DynamicFormExampleInterface):void
    {
        if(!isNullOrUndefined(formData['customerData'].firstName) &&
           !isNullOrUndefined(formData['customerData'].lastName))
        {
            alert('Successfully saved.');
        }
        else
        {
            alert('');
        }
    }
}


