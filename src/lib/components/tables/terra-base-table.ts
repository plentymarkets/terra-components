import { TerraDataTableRowInterface } from './data-table/interfaces/terra-data-table-row.interface';
import {
    EventEmitter,
    Output
} from '@angular/core';
import { isNullOrUndefined } from 'util';

export class TerraBaseTable<T>
{
    /**
     * @description EventEmitter that notifies when a row has been selected via the select box. This is enabled, only if
     *     `inputHasCheckboxes` is true.
     */
    @Output()
    public readonly outputRowCheckBoxChanged:EventEmitter<TerraDataTableRowInterface<T>> = new EventEmitter();

    public _headerCheckbox:{ checked:boolean, isIndeterminate:boolean };
    protected readonly _rowList:Array<TerraDataTableRowInterface<T>>;

    /**
     * @description Constructor initializing the table component
     */
    constructor()
    {
        this._headerCheckbox = {
            checked:         false,
            isIndeterminate: false
        };
    }

    /**
     * @description Getter for selectedRowList
     */
    public get selectedRowList():Array<TerraDataTableRowInterface<T>>
    {
        if(isNullOrUndefined(this._rowList))
        {
            return [];
        }
        return this._rowList.filter((row:TerraDataTableRowInterface<T>) => row.selected);
    }

    public rowClicked(row:TerraDataTableRowInterface<T>):void
    {
        if(!row.disabled)
        {
            this._rowList.forEach((r:TerraDataTableRowInterface<T>) =>
            {
                r.isActive = false;
            });

            row.isActive = true;

            if(!isNullOrUndefined(row.clickFunction))
            {
                row.clickFunction();
            }
        }
    }

    public onRowCheckboxChange(row:TerraDataTableRowInterface<T>):void
    {
        // notify component user
        this.outputRowCheckBoxChanged.emit(row);

        // update row selection
        row.selected = !row.selected;

        // update header checkbox state
        this._updateHeaderCheckboxState();
    }

    public _onHeaderCheckboxChange():void
    {
        if(this._headerCheckbox.checked)
        {
            this._resetSelectedRows();
        }
        else
        {
            this._selectAllRows();
        }
    }

    protected _resetSelectedRows():void
    {
        // reset selected rows which are not disabled
        this._rowList.forEach((row:TerraDataTableRowInterface<T>) =>
        {
            if(!row.disabled)
            {
                row.selected = false;
            }
        });

        // evaluate new header checkbox state
        this._updateHeaderCheckboxState();
    }

    private _checkHeaderCheckbox():void
    {
        this._headerCheckbox.checked = true;
        this._headerCheckbox.isIndeterminate = false;
    }

    private _uncheckHeaderCheckbox():void
    {
        this._headerCheckbox.checked = false;
        this._headerCheckbox.isIndeterminate = false;
    }

    private _setHeaderCheckboxIndeterminate():void
    {
        this._headerCheckbox.checked = false;
        this._headerCheckbox.isIndeterminate = true;
    }

    private _updateHeaderCheckboxState():void
    {
        let selectedRowsCount:number = this.selectedRowList.length;
        if(selectedRowsCount === 0) // anything selected?
        {
            this._uncheckHeaderCheckbox();
        }
        else if(selectedRowsCount > 0 && this._rowList.length === selectedRowsCount) // all selected?
        {
            this._checkHeaderCheckbox();
        }
        else // some rows selected -> indeterminate
        {
            this._setHeaderCheckboxIndeterminate();
        }
    }

    private _selectAllRows():void
    {
        // select all rows which are not disabled
        this._rowList.forEach((row:TerraDataTableRowInterface<T>) =>
        {
            if(!row.disabled)
            {
                row.selected = true;
            }
        });

        // evaluate new header checkbox state
        this._updateHeaderCheckboxState();
    }
}
