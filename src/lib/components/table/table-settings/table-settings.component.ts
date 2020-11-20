import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableSettingsDialogComponent } from './dialog/table-settings-dialog.component';
import { ColumnInterface } from './interface/column.interface';

/**
 * Component that displays the settings for a MatTable
 * @experimental
 */
@Component({
    selector: 'tc-table-settings',
    templateUrl: './table-settings.component.html',
    styleUrls: ['./table-settings.component.scss']
})
export class TableSettingsComponent {
    /**
     * @description The table itself.
     */
    @Input()
    public columns: Array<ColumnInterface>;

    /**
     * @description The array of columns that were selected.
     */
    @Input()
    public selectedColumns: Array<string> = [];

    /**
     * @description Emits the array of selected columns.
     */
    @Output()
    public selectedColumnsChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale, private _dialog: MatDialog) {}

    /**
     * @description Open the setting dialog/overlay.
     * @returns void
     */
    public _openSettings(): void {
        const dialogRef: MatDialogRef<TableSettingsDialogComponent> = this._dialog.open(TableSettingsDialogComponent, {
            width: 'auto',
            disableClose: true,
            data: {
                columns: this.columns || [],
                selectedColumns: this.selectedColumns
            },
            minWidth: 220
        });

        dialogRef.afterClosed().subscribe((result: Array<string>) => {
            if (result) {
                this.selectedColumns = result;
                this.selectedColumnsChange.emit(this.selectedColumns);
            }
        });
    }
}
