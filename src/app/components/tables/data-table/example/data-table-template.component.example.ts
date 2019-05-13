import { Component } from '@angular/core';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { TerraDataTableServiceExample } from './terra-data-table.service.example';
import { TerraDataTableComponentExample } from './terra-data-table.component.example';

@Component({
    selector:  'tc-data-table-template-example',
    template:  require('./data-table-template.component.example.html'),
    styles:    [require('./data-table-template.component.example.scss')],
    providers: [TerraDataTableServiceExample]
})
export class DataTableTemplateComponentExample extends TerraDataTableComponentExample
{
    protected editIndex:number;

    constructor(service:TerraDataTableServiceExample)
    {
        super(service);
    }

    protected isEdited(index:number):boolean
    {
        return index === this.editIndex;
    }

    protected startEditing(index:number):void
    {
        this.editIndex = index;
    }

    protected stopEditing(value:any):void
    {
        this.editIndex = undefined;

        alert('A saving event should be called now instead of an alert.');
    }
}
