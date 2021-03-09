import { AfterViewInit, Component, Inject, OnInit, QueryList } from '@angular/core';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableSettingsDialogData } from '../interface/table-settings-dialog-data.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnInterface } from '../interface/column.interface';
import { CdkColumnDef, CdkTable } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'tc-table-settings-dialog',
    templateUrl: './table-settings-dialog.component.html'
})
export class TableSettingsDialogComponent implements OnInit, AfterViewInit {
    public _columns: Array<ColumnInterface>;
    public _selectedColumns: Array<string>;
    public _table: CdkTable<any>;
    public _columnDefs$: Observable<Array<CdkColumnDef>>;

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
        this._table = this.data.table;
    }

    public ngAfterViewInit(): void {
        this._columnDefs$ = this._table._contentColumnDefs.changes.pipe(
            startWith(this._table._contentColumnDefs),
            map((ql: QueryList<CdkColumnDef>) => ql.toArray())
        );
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

    public get columnDefs(): Map<string, CdkColumnDef> {
        // @ts-ignore
        return this._table._columnDefsByName;
    }
}
