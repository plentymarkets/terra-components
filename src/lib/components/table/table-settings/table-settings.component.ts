import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { Language } from 'angular-l10n';
import {
    MatDialog,
    MatDialogRef
} from '@angular/material/dialog';
import {
    MatTable
} from '@angular/material/table';
import { TableSettingsDialogComponent } from './dialog/table-settings-dialog.component';

/**
 * Component that displays the settings for a MatTable
 * @experimental
 */
@Component({
    selector:    'tc-table-settings',
    templateUrl: './table-settings.component.html',
    styleUrls:   ['./table-settings.component.scss']
})
export class TableSettingsComponent
{
    /**
     * @description The table itself.
     */
    @Input()
    public table:MatTable<any>;

    /**
     * @description The array of columns that were selected.
     */
    @Input()
    public selectedColumns:Array<string> = [];

    /**
     * @description Emits the array of selected columns.
     */
    @Output()
    public selectedColumnsChange:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

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
        const dialogRef:MatDialogRef<TableSettingsDialogComponent> = this._dialog.open(TableSettingsDialogComponent,
            {
                width:        'auto',
                disableClose: true,
                data:         {
                    columns:         this.table ? this.table._contentColumnDefs.toArray() : [],
                    selectedColumns: this.selectedColumns
                }
            });

        dialogRef.afterClosed().subscribe((result:Array<string>) =>
        {
            if(result)
            {
                this.selectedColumns = result;
                this.selectedColumnsChange.emit(this.selectedColumns);
            }
        });
    }
}
