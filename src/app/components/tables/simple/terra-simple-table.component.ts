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
import { isNull } from 'util';

@Component({
    selector: 'terra-simple-table',
    styles:   [require('./terra-simple-table.component.scss')],
    template: require('./terra-simple-table.component.html')
})
export class TerraSimpleTableComponent<D> implements OnChanges
{
    @Input()
    public inputHeaderList:Array<TerraSimpleTableHeaderCellInterface>;

    @Input()
    public set inputRowList(value:Array<TerraSimpleTableRowInterface<D>>)
    {
        this._rowList = value;

        this.updateHeaderCheckboxState();
    };

    public get inputRowList():Array<TerraSimpleTableRowInterface<D>>
    {
        return this._rowList;
    };

    @Input()
    public inputUseHighlighting:boolean = false;

    @Input()
    public inputIsStriped:boolean = false;

    @Input()
    public inputHasCheckboxes:boolean = false;

    @Input()
    public inputEnableHotkeys:boolean = false;

    @Input()
    public inputHighlightedRow:TerraSimpleTableRowInterface<D>;

    @Output()
    public outputHeaderCheckBoxChanged:EventEmitter<boolean> = new EventEmitter();

    @Output()
    public outputRowCheckBoxChanged:EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @Output()
    public outputRowClicked:EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @Output()
    public outputHighlightedRowChange:EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @Output()
    public outputSelectedRowsChange:EventEmitter<Array<TerraSimpleTableRowInterface<D>>> = new EventEmitter();

    @ViewChild('viewChildHeaderCheckbox')
    public viewChildHeaderCheckbox:TerraCheckboxComponent;

    @ViewChild('scrollContainer', {read: ElementRef})
    public scrollContainer:ElementRef;

    public onRowListChange:EventEmitter<void> = new EventEmitter();

    protected headerCheckbox:{ checked:boolean, isIndeterminate:boolean };
    protected _rowList:Array<TerraSimpleTableRowInterface<D>>;

    constructor(private _elementRef:ElementRef)
    {
        this.headerCheckbox = {
            checked:         false,
            isIndeterminate: false
        };

        this._rowList = [];
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputRowList'))
        {
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

    protected checkTooltipPlacement(placement:string):string
    {
        if(isNull(placement) || placement === '')
        {
            return 'top';
        }

        return placement;
    }

    protected onHeaderCheckboxChange():void
    {
        this.outputHeaderCheckBoxChanged.emit(!this.headerCheckbox.checked);

        if(this.headerCheckbox.checked)
        {
            this.resetSelectedRows();
        }
        else
        {
            this.selectAllRows();
        }
    }

    protected onRowCheckboxChange(row:TerraSimpleTableRowInterface<D>):void
    {
        row.selected = !row.selected;

        // notify component user
        this.outputRowCheckBoxChanged.emit(row);

        // update header checkbox state
        this.updateHeaderCheckboxState();

        // notify user
        this.triggerOutputSelectedRowsChange();
    }

    protected onCheckboxClick(event:Event):void
    {
        // do not emit 'outputRowClicked' when toggling checkbox
        event.stopPropagation();
    }

    protected onRowClick(row:TerraSimpleTableRowInterface<D>):void
    {
        if(this.inputUseHighlighting && !row.disabled)
        {
            this.inputHighlightedRow = row;
            this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
        }
        this.outputRowClicked.emit(row);
    }

    protected onKeydown(event:KeyboardEvent):void
    {
        if(this.inputEnableHotkeys && this.inputUseHighlighting && this.inputHighlightedRow)
        {
            if(event.which === Key.DownArrow || event.which === Key.UpArrow)
            {
                this.highlightSiblingRow(event.which === Key.DownArrow);
            }

            if(event.which === Key.Space && this.inputHasCheckboxes)
            {
                if(event.ctrlKey || event.metaKey)
                {
                    this.headerCheckbox.checked = !this.headerCheckbox.checked;
                    //this.onHeaderCheckboxChange();
                }
                else
                {
                    this.onRowCheckboxChange(this.inputHighlightedRow);
                }
            }

            if(event.which === Key.Enter)
            {
                this.outputRowClicked.emit(this.inputHighlightedRow);
            }

            event.preventDefault();
        }
    }

    private triggerOutputSelectedRowsChange():void
    {
        let selectedRows:Array<TerraSimpleTableRowInterface<D>> =
            this.inputRowList.filter((row:TerraSimpleTableRowInterface<D>) => row.selected === true);

        this.outputSelectedRowsChange.emit(selectedRows);
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
        let selectedRows:Array<TerraSimpleTableRowInterface<D>> = this.inputRowList.filter((row:TerraSimpleTableRowInterface<D>) => row.selected === true);

        if(selectedRows.length === 0) // anything selected?
        {
            this.uncheckHeaderCheckbox();
        }
        else if(selectedRows.length > 0 && this.inputRowList.filter(
                (r:TerraSimpleTableRowInterface<D>):boolean => !r.disabled).length === selectedRows.length) // all selected?
        {
            this.checkHeaderCheckbox();
        }
        else // some rows selected -> indeterminate
        {
            this.setHeaderCheckboxIndeterminate();
        }
    }

    private selectRow(row:TerraSimpleTableRowInterface<D>):void
    {
        row.selected = true;

        // notify user that selection has changed
        this.triggerOutputSelectedRowsChange();
    }

    private selectAllRows():void
    {
        this.checkHeaderCheckbox();

        this.inputRowList.forEach((row:TerraSimpleTableRowInterface<D>) =>
        {
            if(!row.disabled)
            {
                this.selectRow(row);
            }
        });
    }

    private resetSelectedRows():void
    {
        this.uncheckHeaderCheckbox();

        this.inputRowList.forEach((row:TerraSimpleTableRowInterface<D>) =>
        {
            row.selected = false;
        });

        // notify user that selection has been reset
        this.triggerOutputSelectedRowsChange();
    }

    private highlightSiblingRow(nextSibling:boolean):void
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
}
