import {
    Component,
    Inject
} from '@angular/core';
import { Language } from 'angular-l10n';
import { ColumnInterface } from '../interface/column.interface';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';
import { TableColumnSettingsDialogData } from '../interface/table-column-settings-dialog-data.interface';

@Component({
    selector:    'table-column-settings-dialog',
    templateUrl: './table-column-settings-dialog.component.html'
})
export class TableColumnSettingsDialogComponent
{
    public _columns:Array<ColumnInterface> = [];
    public _selectedColumns:Array<ColumnInterface> = [];
    public dialogRef:MatDialogRef<TableColumnSettingsDialogComponent>;
    @Language()
    public _lang:string;

    constructor(@Inject(MAT_DIALOG_DATA) public data:TableColumnSettingsDialogData)
    {
    }

    ngOnInit()
    {
        this._columns = this.data.columns;
        this._selectedColumns = this.data.selectedColumns;
    }

    public _customize()
    {
        //do stuff
    }

    onCancel():void
    {
        this.dialogRef.close();
    }
}
