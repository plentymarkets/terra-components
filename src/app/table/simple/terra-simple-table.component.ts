import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
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
export class TerraSimpleTableComponent<D> implements OnChanges
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
    @Output() outputSelectedRowsChange:EventEmitter<Array<TerraSimpleTableRowInterface<D>>> = new EventEmitter();

    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;

    @ViewChild('scrollContainer', {read: ElementRef}) scrollContainer:ElementRef;

    private _isHeaderCheckboxChecked:boolean = false;
    private _selectedRowList:Array<TerraSimpleTableRowInterface<D>> = [];

    public onRowListChange:EventEmitter<void> = new EventEmitter();

    constructor(private _elementRef:ElementRef)
    {
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty("inputRowList"))
        {
            this._isHeaderCheckboxChecked = false;
            this.onRowListChange.emit();
        }
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

        this.inputRowList.forEach((row) =>
        {
            if(!row.disabled)
            {
                this.changeRowState(isChecked, row);
            }
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

    private onCheckboxClick(event:Event):void
    {
        // do not emit 'outputRowClicked' when toggling checkbox
        event.stopPropagation();
    }

    private onRowClick(event:MouseEvent, row:TerraSimpleTableRowInterface<D>):void
    {
        if(this.inputUseHighlighting && !row.disabled)
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

            if(event.which === Key.Space && this.inputHasCheckboxes)
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

            if(event.which === Key.Enter)
            {
                this.outputRowClicked.emit(this.inputHighlightedRow);
            }

            event.preventDefault();
        }
    }

    private highlightSiblingRow(nextSibling:boolean)
    {
        if(this.inputHighlightedRow)
        {
            let i:number = nextSibling ? 1 : -1;
            let highlightIndex:number = this.inputRowList.indexOf(this.inputHighlightedRow) + i;

            while(highlightIndex >= 0 && highlightIndex < this.inputRowList.length)
            {
                if(!this.inputRowList[highlightIndex].disabled)
                {
                    this.inputHighlightedRow = this.inputRowList[highlightIndex];
                    this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
                    break;
                }
                highlightIndex += i;
            }

            if(highlightIndex >= 0 && highlightIndex < this.inputRowList.length)
            {
                let activeRow:HTMLElement = this._elementRef.nativeElement.querySelector('table tbody tr:nth-child(' + (highlightIndex + 1) + ')');
                let viewport:ClientRect = this.scrollContainer.nativeElement.getBoundingClientRect();
                let activeRowPosition:ClientRect = activeRow.getBoundingClientRect();

                if(viewport.bottom < activeRowPosition.bottom)
                {
                    this.scrollContainer.nativeElement.scrollTop += (activeRowPosition.bottom - viewport.bottom);
                }
                else if(viewport.top > activeRowPosition.top)
                {
                    this.scrollContainer.nativeElement.scrollTop -= (viewport.top - activeRowPosition.top);
                }
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

        this.outputSelectedRowsChange.emit(this._selectedRowList);
    }
}
