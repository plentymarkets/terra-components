import {
    Component,
    Inject,
    OnInit,
    QueryList
} from '@angular/core';
import { Language } from 'angular-l10n';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumnSettingsDialogData } from '../interface/table-column-settings-dialog-data.interface';
import { MatColumnDef } from '@angular/material/table';
import {
    CdkDragDrop,
    moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
    selector:    'tc-table-column-settings-dialog',
    templateUrl: './table-column-settings-dialog.component.html'
})
export class TableColumnSettingsDialogComponent implements OnInit
{
    public _columns:Array<MatColumnDef>;
    public _selectedColumns:Array<string>;
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

    public _onDrop(event:CdkDragDrop<Array<MatColumnDef>>):void
    {
        moveItemInArray(this._columns, event.previousIndex, event.currentIndex);
        let index:number = this._selectedColumns.indexOf(event.item.data);

        if(index > -1)
        {
            // moveItemInArray(this._selectedColumns, )
        }
    }

    public _updateSelectedList():Array<string>
    {
        let sortedList:Array<string> = [];

        this._columns.forEach((col:MatColumnDef) =>
        {
            let index:number = this._selectedColumns.indexOf(col.name);

            if(index > -1)
            {
                sortedList.push(col.name);
            }
        });

        return sortedList;
    }
}
