import {
    Component,
    Inject,
    OnInit
} from '@angular/core';
import { Language } from 'angular-l10n';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatColumnDef } from '@angular/material/table';
import { TableSettingsDialogData } from '../interface/table-settings-dialog-data.interface';
import {
    CdkDragDrop,
    moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
    selector:    'tc-table-settings-dialog',
    templateUrl: './table-settings-dialog.component.html'
})
export class TableSettingsDialogComponent implements OnInit
{
    public _columns:Array<MatColumnDef>;
    public _selectedColumns:Array<string>;
    @Language()
    public _lang:string;

    constructor(@Inject(MAT_DIALOG_DATA) public data:TableSettingsDialogData)
    {
    }

    /**
     * @description Assign the injected data to the component properties.
     */
    public ngOnInit():void
    {
        this._selectedColumns = this.data.selectedColumns.slice();
        this._columns = this._sort(this.data.columns);
    }


    public _onDrop(event:CdkDragDrop<Array<MatColumnDef>>):void
    {
        moveItemInArray(this._selectedColumns, event.previousIndex, Math.min(event.currentIndex, this._selectedColumns.length));

        this._columns = this._sort(this._columns);
    }

    public _sort(cols:Array<MatColumnDef>):Array<MatColumnDef>
    {
        let selectedList:Array<MatColumnDef> = this._selectedColumns.map((key:string) =>
        {
            return cols.find((col:MatColumnDef) => col.name === key);
        });

        let unselectedList:Array<MatColumnDef> = cols.filter((col:MatColumnDef) =>
        {
            return !this._selectedColumns.includes(col.name));
        });

        return selectedList.concat(unselectedList);
    }
}
