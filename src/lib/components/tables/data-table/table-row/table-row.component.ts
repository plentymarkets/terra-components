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
    selector:    'tr[tcTableRow]',
    templateUrl: './table-row.component.html',
    styleUrls: [ './table-row.component.scss']
})
export class TableRowComponent
{
    /* tslint:disable-next-line:no-input-rename */
    @Input('tcTableRow')
    public row:TerraDataTableRowInterface<any>;

    constructor(@Host() protected dataTable:TerraDataTableComponent<any, any>)
    {
    }

    @HostBinding('class.selected')
    private get selected():boolean
    {
        return this.row.selected;
    }

    @HostBinding('class.isActive')
    private get isActive():boolean
    {
        return this.row.isActive;
    }

    @HostBinding('class.disabled')
    private get disabled():boolean
    {
        return this.row.disabled;
    }

    @HostListener('click')
    private onClick():void
    {
        this.dataTable.rowClicked(this.row);
    }
}

/* tslint:enable:component-selector */
