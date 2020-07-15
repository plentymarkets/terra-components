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
import { TableColumnSettingsDialogComponent } from './dialog/table-column-settings-dialog.component';
import { MatTable } from '@angular/material/table';
import { noop } from 'rxjs';

@Component({
    selector:    'terra-column-settings',
    templateUrl: './table-column-settings.component.html',
    styleUrls:   ['./table-column-settings.component.scss']
})
export class TableColumnSettingsComponent
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

    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(value:Array<string>) => void = noop;

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
                    columns:         this.table._contentColumnDefs.toArray(),
                    selectedColumns: this.selectedColumns
                }
            });

        dialogRef.afterClosed().subscribe((result:Array<string>) =>
        {
            if(result !== null)
            {
                this.selectedColumns = result;
                this.selectedColumnsChange.emit(this.selectedColumns);
                this._onChangeCallback(result);
                this._onTouchedCallback();
            }
        });
    }

    public registerOnChange(fn:(value:Array<string>) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public writeValue(obj:Array<string>):void
    {
        this.selectedColumns = obj;
    }
}
