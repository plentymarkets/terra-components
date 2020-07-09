import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { Language } from 'angular-l10n';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnSettingsDialogComponent } from './dialog/table-column-settings-dialog.component';
import { MatColumnDef } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog/typings/dialog-ref';

@Component({
    selector:    'terra-column-settings',
    templateUrl: './table-column-settings.component.html',
    styleUrls:   ['./table-column-settings.component.scss']
})
export class TableColumnSettingsComponent
{
    /**
     * @description The array of columns to be configured.
     */
    @Input()
    public columns:Array<MatColumnDef> = [];
    /**
     * @description The array of columns that were selected.
     */
    @Input()
    public selectedColumns:Array<string> = [];
    /**
     * @description Emits the array of selected columns.
     */
    @Output()
    public selectedColumnsChanged:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

    @Language()
    public _lang:string;

    constructor(private _dialog:MatDialog)
    {
    }

    /**
     * @description Open the setting dialog/overlay.
     * @returns void
     */
    public _openSettings():void
    {
        const dialogRef:MatDialogRef<TableColumnSettingsDialogComponent> = this._dialog.open(TableColumnSettingsDialogComponent,
            {
                width:        'auto',
                disableClose: true,
                data:         {
                    columns:         this.columns,
                    selectedColumns: this.selectedColumns
                }
            });

        dialogRef.afterClosed().subscribe((result:Array<string>) =>
        {
            if(result !== null)
            {
                this.selectedColumns = result;
                this.selectedColumnsChanged.emit(this.selectedColumns);
            }
        });
    }
}
