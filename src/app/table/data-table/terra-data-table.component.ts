import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { TerraDataTableHeaderCellInterface } from './cell/terra-data-table-header-cell.interface';
import { TerraDataTableRowInterface } from './row/terra-data-table-row.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
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

@Component({
    selector:  'terra-data-table',
    styles:    [require('./terra-data-table.component.scss')],
    template:  require('./terra-data-table.component.html'),
    providers: [TerraDataTableContextMenuService]
})
export class TerraDataTableComponent<T, P> implements OnInit, OnChanges
{
    /**
     * @description Service, that is used to request the table data from the server
     */
    @Input() inputService:TerraDataTableBaseService<T, P>;
    /**
     * @description List of header cell elements
     */
    @Input() inputHeaderList:Array<TerraDataTableHeaderCellInterface>;
    /**
     * @description List of table rows containing all the data
     */
    @Input() inputRowList:Array<TerraDataTableRowInterface<T>>;

    /**
     * @description enables the user to sort the table by selected columns
     */
    @Input() inputIsSortable:boolean;
    /**
     * @description show checkboxes in the table, to be able to select any row
     */
    @Input() inputHasCheckboxes:boolean;
    /**
     * @description show/hides the pager above the table
     */
    @Input() inputHasPager:boolean;
    /**
     * @description Primary text for no results notice
     */
    @Input() inputNoResultTextPrimary:string;
    /**
     * @description Secondary text for no results notice
     */
    @Input() inputNoResultTextSecondary:string;
    /**
     * @description Buttons for no results notice
     */
    @Input() inputNoResultButtons:Array<TerraButtonInterface>;

    /**
     * @description EventEmitter that notifies when a row has been selected via the select box. This is enabled, only if `inputHasCheckboxes` is true.
     */
    @Output() outputRowCheckBoxChanged:EventEmitter<TerraDataTableRowInterface<T>> = new EventEmitter();

    private _headerCheckbox:{ checked:boolean, isIndeterminate:boolean };
    private _selectedRowList:Array<TerraDataTableRowInterface<T>>;
    private _sortOrderEnum = TerraDataTableSortOrder;

    /**
     * @description Constructor initializing the table component
     */
    constructor()
    {
        // set default input values
        this.inputHasCheckboxes = true;
        this.inputHasPager = true;
        this.inputIsSortable = false;

        // initialize local variables
        this._selectedRowList = [];
        this._headerCheckbox = {
            checked:         false,
            isIndeterminate: false
        };
    }

    /**
     * @description Initialization routine. It sets up the pager.
     */
    public ngOnInit():void
    {
        this.initPagination();
    }

    /**
     * @description Change detection routine. It resets the sorting configuration if the header list is updated.
     * @param {SimpleChanges} changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['inputHeaderList'])
        {
            if(this.inputIsSortable)
            {
                this.resetSorting();
            }
        }
    }

    /**
     * default initialization of the paging information which are stored in the input service
     */
    private initPagination()
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

        // init paging data
        this.inputService.updatePagingData({
            page:           1,
            itemsPerPage:   itemsPerPage,
            totalsCount:    1,
            isLastPage:     true,
            lastPageNumber: 1,
            lastOnPage:     1,
            firstOnPage:    1
        });
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
            this._headerCheckbox.checked = false;
        }
        else if(this.selectedRowList.length > 0 && this.inputRowList.length == this.selectedRowList.length) // all selected?
        {
            this._headerCheckbox.checked = true;
        }
        else // some rows selected
        {
            this._headerCheckbox.isIndeterminate = true;
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
        this._headerCheckbox.checked = true;

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
        this._headerCheckbox.checked = false;

        // reset selected row list
        this._selectedRowList = [];
    }

    /**
     * @description Getter for selectedRowList
     * @returns {Array<TerraDataTableRowInterface<T>>}
     */
    public get selectedRowList():Array<TerraDataTableRowInterface<T>>
    {
        return this._selectedRowList;
    }

    private rowClicked(row:TerraDataTableRowInterface<T>):void
    {
        if(!row.disabled)
        {
            this.inputRowList.forEach((r:TerraDataTableRowInterface<T>) =>
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

    private doPaging(pagerData:TerraPagerInterface):void
    {
        // request data from server
        this.getResults();

        // reset row selections
        this.resetSelectedRows();
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
        // change sorting column and order only if no request is pending and sortBy attribute is given
        if(!this.inputService.requestPending && this.inputIsSortable && header.sortBy)
        {
            this.changeSortingColumn(header);
        }
    }

    private changeSortingColumn(header:TerraDataTableHeaderCellInterface)
    {
        // clicked on the same column?
        if(this.inputService.sortBy === header.sortBy)
        {
            // only change sorting order
            this.toggleSortingOrder();
        }
        else
        {
            this.inputService.sortBy = header.sortBy;
            this.inputService.sortOrder = TerraDataTableSortOrder.DESCENDING; // default is descending
        }

        // get Results with updated parameter
        this.getResults();
    }

    private toggleSortingOrder():void
    {
        this.inputService.sortOrder = this.inputService.sortOrder === TerraDataTableSortOrder.DESCENDING ?
            TerraDataTableSortOrder.ASCENDING :
            TerraDataTableSortOrder.DESCENDING;
    }

    private resetSorting():void
    {
        // sort by the first sortable column, if available
        let defaultSortColumn:TerraDataTableHeaderCellInterface = this.getFirstSortableColumn();
        if(this.inputHeaderList && defaultSortColumn)
        {
            this.inputService.sortBy = defaultSortColumn.sortBy;
            this.inputService.sortOrder = TerraDataTableSortOrder.DESCENDING;
        }
    }

    private getFirstSortableColumn():TerraDataTableHeaderCellInterface
    {
        // check if header list is given
        if(this.inputHeaderList)
        {
            // find first header cell where sortBy attribute is given
            let headerCell:TerraDataTableHeaderCellInterface;
            headerCell = this.inputHeaderList.find((header:TerraDataTableHeaderCellInterface) => !isNullOrUndefined(header.sortBy));
            if(headerCell)
            {
                return headerCell;
            }
        }

        // return null if nothing is found
        return null;
    }

    private getResults():void
    {
        this.inputService.getResults();
    }
}
