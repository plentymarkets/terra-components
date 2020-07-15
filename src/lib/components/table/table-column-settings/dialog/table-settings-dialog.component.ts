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
    CdkDragMove,
    CdkDragSortEvent,
    moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'tc-table-settings-dialog',
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
        this._selectedColumns = this.data.selectedColumns;
        this._sort(this.data.columns);
    }


    public _onDrop(event:CdkDragDrop<Array<MatColumnDef>>):void
    {
        moveItemInArray(this._columns, event.previousIndex, event.currentIndex);

        this._sort(this._columns);
    }

    public _updateSelectedList():{ sortedList:Array<string>, columns:Array<MatColumnDef> }
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

        return {
            sortedList: sortedList,
            columns:    this._columns
        };
    }

    public _sort(cols:Array<MatColumnDef>):void
    {
        let selectedList:Array<MatColumnDef> = [];
        let unselectedList:Array<MatColumnDef> = [];

        cols.forEach((col:MatColumnDef) =>
        {
            if(this._selectedColumns.includes(col.name))
            {
                selectedList.push(col);
            }
            else
            {
                unselectedList.push(col);
            }
        });

        this._columns = selectedList.concat(unselectedList);
    }
}
