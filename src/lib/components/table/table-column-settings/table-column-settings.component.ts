import {
    Component
} from '@angular/core';
import { ColumnInterface } from './interface/column.interface';
import { Language } from 'angular-l10n';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector:    'terra-column-settings',
    templateUrl: './table-column-settings.component.html',
    styleUrls:   ['./table-column-settings.component.scss']
})
export class TableColumnSettingsComponent
{
    public columns:Array<ColumnInterface> = [];
    public selectedColumns:Array<ColumnInterface> = [];

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
        });
    }
}
