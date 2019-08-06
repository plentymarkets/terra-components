import { Component } from '@angular/core';
import { FormTypeMap } from '../model/form-type-map';
import { TerraKeyValueInterface } from '../../../../models';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { formFields } from './form-fields';

@Component({
    selector:    'terra-form-example',
    template: require('./terra-form.component.example.html'),
    styles:   [require('./terra-form.component.example.scss')]
})
export class TerraFormComponentExample
{
    protected formFields:TerraKeyValueInterface<TerraFormFieldInterface> = formFields;
    protected formTypeMap:FormTypeMap = new FormTypeMap();
    protected formValue:any;
}
