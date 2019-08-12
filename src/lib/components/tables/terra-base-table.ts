import { TerraDataTableRowInterface } from './data-table/interfaces/terra-data-table-row.interface';
import {
    EventEmitter,
    Output
} from '@angular/core';
import { isNullOrUndefined } from '../../helpers/null-checker';

export class TerraBaseTable<T>
{
    /**
     * @description EventEmitter that notifies when a row has been selected via the select box. This is enabled, only if
     *     `inputHasCheckboxes` is true.
     */
    @Output()
    public outputRowCheckBoxChanged:EventEmitter<TerraDataTableRowInterface<T>> = new EventEmitter();

    protected readonly rowList:Array<TerraDataTableRowInterface<T>>;
    protected headerCheckbox:{ checked:boolean, isIndeterminate:boolean };

    /**
     * @description Constructor initializing the table component
     */
    constructor()
    {
        this.headerCheckbox = {
            checked:         false,
            isIndeterminate: false
        };
    }

    /**
     * @description Getter for selectedRowList
     * @returns {Array<TerraDataTableRowInterface<T>>}
     */
    public get selectedRowList():Array<TerraDataTableRowInterface<T>>
    {
        if(isNullOrUndefined(this.rowList))
        {
            return [];
        }
        return this.rowList.filter((row:TerraDataTableRowInterface<T>) => row.selected);
    }

    public rowClicked(row:TerraDataTableRowInterface<T>):void
    {
        if(!row.disabled)
        {
            this.rowList.forEach((r:TerraDataTableRowInterface<T>) =>
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
        this.updateHeaderCheckboxState();
    }

    protected onHeaderCheckboxChange():void
    {
        if(this.headerCheckbox.checked)
        {
            this.resetSelectedRows();
        }
        else
        {
            this.selectAllRows();
        }
    }

    protected resetSelectedRows():void
    {
        // reset selected rows which are not disabled
        this.rowList.forEach((row:TerraDataTableRowInterface<T>) =>
        {
            if(!row.disabled)
            {
                row.selected = false;
            }
        });

        // evaluate new header checkbox state
        this.updateHeaderCheckboxState();
    }

    private checkHeaderCheckbox():void
    {
        this.headerCheckbox.checked = true;
        this.headerCheckbox.isIndeterminate = false;
    }

    private uncheckHeaderCheckbox():void
    {
        this.headerCheckbox.checked = false;
        this.headerCheckbox.isIndeterminate = false;
    }

    private setHeaderCheckboxIndeterminate():void
    {
        this.headerCheckbox.checked = false;
        this.headerCheckbox.isIndeterminate = true;
    }

    private updateHeaderCheckboxState():void
    {
        let selectedRowsCount:number = this.selectedRowList.length;
        if(selectedRowsCount === 0) // anything selected?
        {
            this.uncheckHeaderCheckbox();
        }
        else if(selectedRowsCount > 0 && this.rowList.length === selectedRowsCount) // all selected?
        {
            this.checkHeaderCheckbox();
        }
        else // some rows selected -> indeterminate
        {
            this.setHeaderCheckboxIndeterminate();
        }
    }

    private selectAllRows():void
    {
        // select all rows which are not disabled
        this.rowList.forEach((row:TerraDataTableRowInterface<T>) =>
        {
            if(!row.disabled)
            {
                row.selected = true;
            }
        });

        // evaluate new header checkbox state
        this.updateHeaderCheckboxState();
    }
}
