import {
    Component,
    OnInit
} from '@angular/core';
import { FormTypeMap } from '../model/form-type-map';
import { TerraKeyValueInterface } from '../../../../models/terra-key-value.interface';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { formFields } from './form-fields';

@Component({
    selector:    'terra-form-example',
    templateUrl: './terra-form.component.example.html',
    styleUrls:   ['./terra-form.component.example.scss']
})
export class TerraFormComponentExample implements OnInit
{
    protected formFields:TerraKeyValueInterface<TerraFormFieldInterface> = formFields;
    protected formTypeMap:FormTypeMap = new FormTypeMap();

    constructor()
    {}

    ngOnInit()
    {
    }
}
