import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TerraDataTableHeaderCellInterface } from './cell/terra-data-table-header-cell.interface';
import { TerraDataTableRowInterface } from './row/terra-data-table-row.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';
import { TerraDataTableContextMenuService } from './context-menu/service/terra-data-table-context-menu.service';
import {
    isArray,
    isNullOrUndefined
} from 'util';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';
import { TerraRefTypeInterface } from './cell/terra-ref-type.interface';
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';
import { TerraDataTableTextInterface } from './cell/terra-data-table-text.interface';
import { TerraDataTableSortOrder } from './terra-data-table-sort-order.enum';
import { TerraDataTableBaseService } from './terra-data-table-base.service';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';

@Component({
    selector:  'terra-data-table',
    providers: [TerraDataTableContextMenuService],
    styles:    [require('./terra-data-table.component.scss')],
    template:  require('./terra-data-table.component.html')
})
export class TerraDataTableComponent<T> implements OnInit, OnChanges
{
    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;

    @Input() inputService:TerraDataTableBaseService<T>;
    @Input() inputHeaderList:Array<TerraDataTableHeaderCellInterface>;
    @Input() inputRowList:Array<TerraDataTableRowInterface<T>>;

    /**
     * ability to sort the table by its columns
     */
    @Input() inputIsSortable:boolean;
    @Input() inputHasCheckboxes:boolean;
    @Input() inputHasPager:boolean;
    /**
     * Primary text for no results notice
     */
    @Input() inputNoResultTextPrimary:string;
    /**
     * Secondary text for no results notice
     */
    @Input() inputNoResultTextSecondary:string;
    /**
     * Buttons for no results notice
     */
    @Input() inputNoResultButtons:Array<TerraButtonInterface>;

    @Output() outputRowCheckBoxChanged:EventEmitter<TerraDataTableRowInterface<T>> = new EventEmitter();

    private _isHeaderCheckboxChecked:boolean = false;


    private _sortOrderEnum = TerraDataTableSortOrder;
    private _sortColumn:TerraDataTableHeaderCellInterface;
    private _sortOrder:TerraDataTableSortOrder;
    private _selectedRowList:Array<TerraDataTableRowInterface<T>>;
    private _pagingData:TerraPagerInterface;

    constructor()
    {
        this.inputHasCheckboxes = true;
        this.inputHasPager = true;
        this._sortColumn = null;
    }

    public ngOnInit():void
    {
        this.initPagingData();
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['_hasCheckboxes'])
        {
            console.warn(
                '_hasCheckboxes is deprecated. It will be removed in one of the upcoming releases. Please use inputHasCheckboxes instead.');
            this.inputHasCheckboxes = changes['_hasCheckboxes'].currentValue;
        }

        if(changes['inputHeaderList'])
        {
            if(this.inputIsSortable)
            {
                this.resetSorting();
            }
        }
    }

    private initPagingData()
    {
        let itemsPerPage:number = 25;
        if(this.inputService.defaultPagingSize)
        {
            itemsPerPage = this.inputService.defaultPagingSize;
        }
        else if(this.inputService.pagingSize && this.inputService.pagingSize[0])
        {
            itemsPerPage = this.inputService.pagingSize[0].value;
        }

        this.inputService.pagingData = {
            page:         1,
            itemsPerPage: itemsPerPage
        };
    }

    private updatePagingData(pagerData:TerraPagerInterface)
    {
        this._pagingData = {
            page:           pagerData.page,
            itemsPerPage:   pagerData.itemsPerPage,
            totalsCount:    pagerData.totalsCount,
            isLastPage:     pagerData.isLastPage,
            lastPageNumber: pagerData.lastPageNumber,
            firstOnPage:    pagerData.firstOnPage,
            lastOnPage:     pagerData.lastOnPage
        };

        this.inputService.pagingData.page = pagerData.page;
        this.inputService.pagingData.itemsPerPage = pagerData.itemsPerPage;
    }

    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        if(isChecked)
        {
            this.selectAllRows();
        }
        else
        {
            this.resetSelectedRows();
        }
    }

    private onRowCheckboxChange(isChecked:boolean, row:TerraDataTableRowInterface<T>):void
    {
        // notify component user
        this.outputRowCheckBoxChanged.emit(row);

        // update row selection
        if(isChecked)
        {
            this.selectRow(row);
        }
        else
        {
            this.deselectRow(row);
        }

        // update header checkbox state
        this.updateHeaderCheckboxState();
    }

    private updateHeaderCheckboxState()
    {
        if(this.selectedRowList.length == 0) // anything selected?
        {
            this._isHeaderCheckboxChecked = false;
        }
        else if(this.selectedRowList.length > 0 && this.inputRowList.length == this.selectedRowList.length) // all selected?
        {
            this._isHeaderCheckboxChecked = true;
        }
        else // some rows selected
        {
            this.viewChildHeaderCheckbox.isIndeterminate = true;
        }
    }

    private selectRow(row:TerraDataTableRowInterface<T>):void
    {
        // check if row is already selected
        if(this.selectedRowList.find((r:TerraDataTableRowInterface<T>) => r === row))
        {
            return;
        }

        // add row to selected row list
        this.selectedRowList.push(row);
    }

    private deselectRow(row:TerraDataTableRowInterface<T>):void
    {
        // get index of the row in the selected row list
        let rowIndex:number = this.selectedRowList.indexOf(row);

        // check if selected row list contains the given row
        if(rowIndex >= 0)
        {
            // remove row from selected row list
            this.selectedRowList.splice(rowIndex, 1);
        }
    }

    private selectAllRows()
    {
        this._isHeaderCheckboxChecked = true;

        this.inputRowList.forEach((row) =>
        {
            if(!row.disabled)
            {
                this.selectRow(row);
            }
        });
    }

    private resetSelectedRows()
    {
        this._isHeaderCheckboxChecked = false;

        // reset selected row list
        this._selectedRowList = [];
    }

    public get selectedRowList():Array<TerraDataTableRowInterface<T>>
    {
        return this._selectedRowList;
    }

    private rowClicked(row:TerraDataTableRowInterface<T>):void
    {
        if(!row.disabled)
        {
            this.inputRowList.forEach((r) =>
            {
                r.isActive = false;
            });

            row.isActive = true;
            row.clickFunction();
        }
    }

    private checkTooltipPlacement(placement:string):string
    {
        if(!isNullOrUndefined(placement) && placement !== '')
        {
            return placement;
        }

        return 'top';
    }
    
    public doPaging(pagerData:TerraPagerInterface):void
    {
        // update paging data with data from the pager
        this.updatePagingData(pagerData);

        // request data from server
        this.getResults();

        // reset row selections
        this.resetSelectedRows();
    }

    public getTextAlign(item:TerraDataTableHeaderCellInterface):any
    {
        if(!isNullOrUndefined(item.textAlign))
        {
            return {'text-align': item.textAlign};
        }
        else
        {
            return {'text-align': "left"};
        }
    }

    private getCellDataType(data:any):string
    {
        function isRefType(arg:any):arg is TerraRefTypeInterface
        {
            return arg
                   && arg.type && typeof arg.type == 'string'
                   && arg.value && typeof arg.value == 'string';
        }

        function isTextType(arg:any):arg is TerraDataTableTextInterface
        {
            return arg
                   && arg.caption && typeof arg.caption == 'string';
        }

        function isTagArray(arg:any):arg is Array<TerraTagInterface>
        {
            // check if it is an array
            if(!isArray(arg))
            {
                return false;
            }

            // check if every element of the array implements the tag interface
            let implementsInterface:boolean = true;
            arg.forEach((elem:any) =>
            {
                implementsInterface = implementsInterface && elem.badge && typeof elem.badge == 'string';
            });

            return arg && implementsInterface;
        }

        function isButtonArray(arg:any):arg is Array<TerraButtonInterface>
        {
            // check if it is an array
            if(!isArray(arg))
            {
                return false;
            }

            // check if every element of the array implements the button interface
            let implementsInterface:boolean = true;
            arg.forEach((elem:any) =>
            {
                implementsInterface = implementsInterface && elem.clickFunction && typeof elem.clickFunction == 'function';
            });

            return arg && implementsInterface;
        }

        if(typeof data === 'object')
        {
            if(isRefType(data))
            {
                return 'TerraRefTypeInterface';
            }
            else if(isTextType(data))
            {
                return 'TerraDataTableTextInterface';
            }
            else if(isTagArray(data))
            {
                return 'tags';
            }
            else if(isButtonArray(data))
            {
                return 'buttons';
            }
        }
        return typeof data;
    }

    private onColumnHeaderClick(header:TerraDataTableHeaderCellInterface):void
    {
        // change sorting column and order only if no request is pending
        if(!this.inputService.requestPending && this.inputIsSortable)
        {
            this.changeSortColumn(header);
        }
    }

    private changeSortColumn(header:TerraDataTableHeaderCellInterface)
    {
        // clicked on the same column?
        if(this._sortColumn === header)
        {
            // only change sorting order
            this.toggleSortingOrder();
        }
        else
        {
            this._sortColumn = header;
            this._sortOrder = TerraDataTableSortOrder.DESCENDING; // default is descending
        }

        // get Results with updated parameter
        this.getResults();
    }

    private toggleSortingOrder():void
    {
        this._sortOrder = this._sortOrder === TerraDataTableSortOrder.DESCENDING ?
            TerraDataTableSortOrder.ASCENDING :
            TerraDataTableSortOrder.DESCENDING;
    }

    private resetSorting():void
    {
        if(this.inputHeaderList && this.inputHeaderList[0])
        {
            this._sortColumn = this.inputHeaderList[0];
            this._sortOrder = TerraDataTableSortOrder.DESCENDING;
        }
    }

    public getResults():void
    {
        let params:TerraPagerParameterInterface = {
            page:         this.inputService.pagingData.page,
            itemsPerPage: this.inputService.pagingData.itemsPerPage
        };
        this.inputService.getResults(params).subscribe((res:TerraPagerInterface) => this.updatePagingData(res));
    }
}
