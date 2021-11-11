import { Component, Inject, OnInit } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableSettingsDialogData } from '../interface/table-settings-dialog-data.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnInterface } from '../interface/column.interface';

@Component({
    selector: 'tc-table-settings-dialog',
    templateUrl: './table-settings-dialog.component.html',
    styleUrls: ['./table-settings-dialog.glob.scss']
})
export class TableSettingsDialogComponent implements OnInit {
    public _columns: Array<ColumnInterface>;
    public _selectedColumns: Array<string>;

    constructor(
        @Inject(L10N_LOCALE) public _locale: L10nLocale,
        @Inject(MAT_DIALOG_DATA) public data: TableSettingsDialogData
    ) {}

    /**
     * @description Assign the injected data to the component properties.
     */
    public ngOnInit(): void {
        this._selectedColumns = this.data.selectedColumns.slice();
        this._columns = this.data.columns;
    }

    /**
     * @param event CDKDragDrop. An Array of MatColumnDefs
     * @description Moves a column from one index in an array to another. Set _selectedColumns again to have a new list for drag and drop.
     */
    public _onDrop(event: CdkDragDrop<Array<ColumnInterface>>): void {
        moveItemInArray(this._columns, event.previousIndex, Math.min(event.currentIndex, this._columns.length));
        this._selectedColumns = this._columns
            .map((column: ColumnInterface) => column.key)
            .filter((columnKey: string) => this._selectedColumns.includes(columnKey));
    }
}
