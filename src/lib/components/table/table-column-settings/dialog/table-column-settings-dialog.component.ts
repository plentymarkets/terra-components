import {
    Component,
    Inject,
    OnInit,
    QueryList
} from '@angular/core';
import { Language } from 'angular-l10n';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';
import { TableColumnSettingsDialogData } from '../interface/table-column-settings-dialog-data.interface';
import { MatColumnDef } from '@angular/material/table';

@Component({
    selector:    'tc-table-column-settings-dialog',
    templateUrl: './table-column-settings-dialog.component.html'
})
export class TableColumnSettingsDialogComponent implements OnInit
{
    public _columns:QueryList<MatColumnDef> = new QueryList<MatColumnDef>();
    public _selectedColumns:Array<string> = [];
    @Language()
    public _lang:string;

    constructor(@Inject(MAT_DIALOG_DATA) public data:TableColumnSettingsDialogData)
    {
    }

    /**
     * @description Assign the injected data to the component properties.
     */
    public ngOnInit():void
    {
        this._columns = this.data.columns;
        this._selectedColumns = this.data.selectedColumns;
    }
}
