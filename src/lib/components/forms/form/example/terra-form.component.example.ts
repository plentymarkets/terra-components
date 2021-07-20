import { Component } from '@angular/core';
import { FormTypeMap } from '../model/form-type-map';
import { TerraKeyValueInterface } from '../../../../models';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

@Component({
    selector: 'terra-form-example',
    templateUrl: './terra-form.component.example.html',
    styleUrls: ['./terra-form.component.example.scss']
})
export class TerraFormComponentExample {
    public _formFields: TerraKeyValueInterface<TerraFormFieldInterface> = {
        portlet: {
            type: 'portlet',
            options: {
                name: 'Portlet'
            },
            children: {
                text: {
                    type: 'text',
                    options: {
                        name: 'Text',
                        required: true
                    }
                },
                number: {
                    type: 'number',
                    options: {
                        name: 'Number',
                        min: 3
                    }
                }
            }
        }
    };
    public _formTypeMap: FormTypeMap = new FormTypeMap();
    public _formValue: any = {};
}
