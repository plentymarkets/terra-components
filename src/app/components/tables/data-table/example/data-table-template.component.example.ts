import { Component } from '@angular/core';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { TerraDataTableServiceExample } from './terra-data-table.service.example';
import { TerraDataTableComponentExample } from './terra-data-table.component.example';

@Component({
    selector:  'tc-data-table-template-example',
    templateUrl: './data-table-template.component.example.html',
    styleUrls: ['./data-table-template.component.example.scss'],
    providers: [TerraDataTableServiceExample]
})
export class DataTableTemplateComponentExample extends TerraDataTableComponentExample
{
    constructor(service:TerraDataTableServiceExample)
    {
        super(service);
    }

    protected saveData(value:any):void
    {
        alert('A saving event should be called now instead of an alert.');
    }
}
