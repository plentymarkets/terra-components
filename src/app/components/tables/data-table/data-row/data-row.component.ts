import {
    Component,
    Host,
    HostBinding,
    HostListener,
    Input
} from '@angular/core';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { TerraDataTableComponent } from '../terra-data-table.component';

/* tslint:disable:component-selector */
@Component({
    selector:    'tr[tcDataRow]',
    templateUrl: './data-row.component.html',
    styleUrls:   ['./data-row.component.scss']
})
export class DataRowComponent
{
    @Input()
    public tcDataRow:TerraDataTableRowInterface<any>;

    constructor(@Host() public dataTable:TerraDataTableComponent<any, any>)
    {
    }

    @HostBinding('class.selected')
    public get selected():boolean
    {
        return this.tcDataRow.selected;
    }

    @HostBinding('class.isActive')
    public get isActive():boolean
    {
        return this.tcDataRow.isActive;
    }

    @HostBinding('class.disabled')
    public get disabled():boolean
    {
        return this.tcDataRow.disabled;
    }

    @HostListener('click')
    public onClick():void
    {
        this.dataTable.rowClicked(this.tcDataRow);
    }
}
/* tslint:enable:component-selector */
