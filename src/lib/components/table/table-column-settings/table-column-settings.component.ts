import {
    Component,
    EventEmitter,
    Output
} from '@angular/core';
import { ColumnInterface } from './interface/column.interface';
import { Language } from 'angular-l10n';
import { MatDialog } from '@angular/material/dialog';
import { TerraDataTableRowInterface } from '../../..';

@Component({
    selector:    'terra-column-settings',
    templateUrl: './table-column-settings.component.html',
    styleUrls:   ['./table-column-settings.component.scss']
})
export class TableColumnSettingsComponent
{
    public columns:Array<ColumnInterface> = [];
    public selectedColumns:Array<string> = [];

    @Output()
    public selectedColumnsChanged:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

    @Language()
    public _lang:string;

    constructor(private _dialog:MatDialog)
    {
    }

    public _openSettings()
    {
        const dialogRef = this._dialog.open(TableColumnSettingsComponent,
            {
                width:        'auto',
                disableClose: true,
                data:         {
                    columns:         this.columns,
                    selectedColumns: this.selectedColumns
                }
            });

        dialogRef.afterClosed().subscribe(result =>
        {
            this.selectedColumns = result;
            this.selectedColumnsChanged.emit(this.selectedColumns);
        });
    }
}
