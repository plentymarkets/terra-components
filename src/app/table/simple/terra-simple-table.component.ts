import {
    Component,
    Input,
    ViewChild
} from '@angular/core';
import { TerraSimpleTableHeaderCellInterface } from './cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from './row/terra-simple-table-row.interface';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';

@Component({
    selector: 'terra-simple-table',
    styles:   [require('./terra-simple-table.component.scss')],
    template: require('./terra-simple-table.component.html')
})
export class TerraSimpleTableComponent
{
    @Input() inputHeaderList:Array<TerraSimpleTableHeaderCellInterface>;
    @Input() inputRowList:Array<TerraSimpleTableRowInterface>;
    @Input() inputUseHighlighting:boolean = false;
    @Input() inputIsStriped:boolean = false;
    @Input() inputHasCheckboxes:boolean = false;

    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;

    private _isHeaderCheckboxChecked:boolean = false;
    private _selectedRowList:Array<TerraSimpleTableRowInterface> = [];

    constructor()
    {
    }

    /**
     * @deprecated
     *
     * @returns {Array<TerraSimpleTableHeaderCellInterface>}
     */
    public get headerList():Array<TerraSimpleTableHeaderCellInterface>
    {
        return this.inputHeaderList;
    }

    /**
     * @deprecated
     *
     * @param value
     */
    public set headerList(value:Array<TerraSimpleTableHeaderCellInterface>)
    {
        this.inputHeaderList = value;
    }

    /**
     * @deprecated
     *
     * @returns {Array<TerraSimpleTableRowInterface>}
     */
    public get rowList():Array<TerraSimpleTableRowInterface>
    {
        return this.inputRowList;
    }

    public set rowList(value:Array<TerraSimpleTableRowInterface>)
    {
        this.inputRowList = value;
    }

    /**
     * @deprecated
     *
     * @param rowToDelete
     */
    public deleteRow(rowToDelete:TerraSimpleTableRowInterface):void
    {
        let index = this.inputRowList.indexOf(rowToDelete);

        this.inputRowList.splice(index, 1);
    }

    private checkTooltipPlacement(placement:string):string
    {
        if(placement != null && placement != '')
        {
            return placement;
        }

        return 'top';
    }

    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        this._isHeaderCheckboxChecked = isChecked;

        this.rowList.forEach(
            (row) =>
            {
                this.changeRowState(isChecked, row);
            });
    }

    private onRowCheckboxChange(isChecked:boolean, row:TerraSimpleTableRowInterface):void
    {
        this.changeRowState(isChecked, row);

        if(this._selectedRowList.length == 0)
        {
            this._isHeaderCheckboxChecked = false;
        }
        else if(this._selectedRowList.length > 0 && this.rowList.length == this._selectedRowList.length)
        {
            this._isHeaderCheckboxChecked = true;
        }
        else
        {
            this.viewChildHeaderCheckbox.isIndeterminate = true;
        }
    }

    private changeRowState(isChecked:boolean, rowToChange:TerraSimpleTableRowInterface):void
    {
        rowToChange.selected = isChecked;

        let rowFound:boolean = false;

        this._selectedRowList.forEach((row) =>
        {
            if(row == rowToChange)
            {
                rowFound = true;
            }
        });

        if(rowToChange.selected)
        {
            if(!rowFound)
            {
                this._selectedRowList.push(rowToChange);
            }
        }
        else
        {
            let index = this._selectedRowList.indexOf(rowToChange);

            this._selectedRowList.splice(index, 1);
        }
    }
}
