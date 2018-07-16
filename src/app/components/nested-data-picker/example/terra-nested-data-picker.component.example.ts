import { Component } from '@angular/core';
import { NestedPickerExampleService } from '../example/service/terra-nested-data-picker-component.service.example';
import { TerraNestedDataPickerBaseService } from '../service/terra-nested-data-picker-base.service';
@Component({
    selector: 'terra-button-example',
    styles:   [require('./terra-nested-data-picker.component.example.scss')],
    template: require('./terra-nested-data-picker.component.example.html')
})
export class TerraNestedDataPickerExample
{
    constructor(private terraService:NestedPickerExampleService)
    {
    }
}
