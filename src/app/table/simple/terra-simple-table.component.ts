import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { TerraSimpleTableHeaderCellInterface } from './cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from './row/terra-simple-table-row.interface';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';
import { Key } from 'ts-keycode-enum';

@Component({
    selector: 'terra-simple-table',
    styles:   [require('./terra-simple-table.component.scss')],
    template: require('./terra-simple-table.component.html')
})
export class TerraSimpleTableComponent<D>
{
    @Input() inputHeaderList:Array<TerraSimpleTableHeaderCellInterface>;
    @Input() inputRowList:Array<TerraSimpleTableRowInterface<D>>;
    @Input() inputUseHighlighting:boolean = false;
    @Input() inputIsStriped:boolean = false;
    @Input() inputHasCheckboxes:boolean = false;
    @Input() inputEnableHotkeys:boolean = false;
    @Input() inputHighlightedRow:TerraSimpleTableRowInterface<D>;

    @Output() outputHeaderCheckBoxChanged:EventEmitter<boolean> = new EventEmitter();
    @Output() outputRowCheckBoxChanged:EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();
    @Output() outputRowClicked:EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();
    @Output() outputHighlightedRowChange:EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;

    private _isHeaderCheckboxChecked:boolean = false;
    private _selectedRowList:Array<TerraSimpleTableRowInterface<D>> = [];

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
    public get rowList():Array<TerraSimpleTableRowInterface<D>>
    {
        return this.inputRowList;
    }

    public set rowList(value:Array<TerraSimpleTableRowInterface<D>>)
    {
        this.inputRowList = value;
    }

    /**
     * @deprecated
     *
     * @param rowToDelete
     */
    public deleteRow(rowToDelete:TerraSimpleTableRowInterface<D>):void
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

        this.outputHeaderCheckBoxChanged.emit(isChecked);

        this.inputRowList.forEach(
            (row) =>
            {
                this.changeRowState(isChecked, row);
            });
    }

    private onRowCheckboxChange(isChecked:boolean, row:TerraSimpleTableRowInterface<D>):void
    {
        this.changeRowState(isChecked, row);
        this.outputRowCheckBoxChanged.emit(row);

        if(this._selectedRowList.length === 0)
        {
            this._isHeaderCheckboxChecked = false;
        }
        else if(this._selectedRowList.length > 0 && this.inputRowList.length === this._selectedRowList.length)
        {
            this._isHeaderCheckboxChecked = true;
        }
        else
        {
            this.viewChildHeaderCheckbox.isIndeterminate = true;
        }
    }

    private onRowClick(row:TerraSimpleTableRowInterface<D>):void
    {
        if(this.inputUseHighlighting)
        {
            this.inputHighlightedRow = row;
            this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
        }
        this.outputRowClicked.emit(row);
    }

    private onKeydown(event:KeyboardEvent):void
    {
        if(this.inputEnableHotkeys && this.inputUseHighlighting && this.inputHighlightedRow)
        {
            if(event.which === Key.DownArrow || event.which === Key.UpArrow)
            {
                this.highlightSiblingRow(event.which === Key.DownArrow)
            }

            if((event.which === Key.Space || event.which === Key.Enter) && this.inputHasCheckboxes)
            {
                if(event.ctrlKey || event.metaKey)
                {
                    this.onHeaderCheckboxChange(!this._isHeaderCheckboxChecked);
                }
                else
                {
                    this.changeRowState(!this.inputHighlightedRow.selected, this.inputHighlightedRow);
                }
            }

            event.preventDefault();
        }
    }

    private highlightSiblingRow(nextSibling:boolean)
    {
        if(this.inputHighlightedRow)
        {
            let highlightIndex:number = this.inputRowList.indexOf(this.inputHighlightedRow);
            if(nextSibling && highlightIndex < this.inputRowList.length - 1)
            {
                this.inputHighlightedRow = this.inputRowList[highlightIndex + 1];
                this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
            }
            if(!nextSibling && highlightIndex > 0)
            {
                this.inputHighlightedRow = this.inputRowList[highlightIndex - 1];
                this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
            }
        }
    }

    private changeRowState(isChecked:boolean, rowToChange:TerraSimpleTableRowInterface<D>):void
    {
        rowToChange.selected = isChecked;

        let rowFound:boolean = false;

        this._selectedRowList.forEach((row) =>
        {
            if(row === rowToChange)
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
