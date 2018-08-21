import { Component } from '@angular/core';
import { NestedPickerExampleService } from '../example/service/terra-nested-data-picker.service.example';

@Component({
    selector:  'terra-nested-data-picker-example',
    styles:    [require('./terra-nested-data-picker.component.example.scss')],
    template:  require('./terra-nested-data-picker.component.example.html'),
    providers: [NestedPickerExampleService]
})
export class TerraNestedDataPickerComponentExample
{
    constructor(protected terraService:NestedPickerExampleService)
    {
    }
}
