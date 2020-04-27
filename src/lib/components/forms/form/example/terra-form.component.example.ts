import { Component } from '@angular/core';
import { FormTypeMap } from '../model/form-type-map';
import { TerraKeyValueInterface } from '../../../../models';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { formFields } from './form-fields';

@Component({
  selector: 'terra-form-example',
  templateUrl: './terra-form.component.example.html',
  styleUrls: ['./terra-form.component.example.scss']
})
export class TerraFormComponentExample {
  public _formFields: TerraKeyValueInterface<TerraFormFieldInterface> = formFields;
  public _formTypeMap: FormTypeMap = new FormTypeMap();
  public _formValue: any = {
    id: 1231,
    listWithChildren: [
      { id: 1, childSelect: 'option2', childNumber: 1232131 },
      { childSelect: 'option1', childNumber: 12241 },
      { childSelect: 'option1', id: 121 }
    ]
  };
}
