import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { TerraDataTableContextMenuService } from './context-menu/terra-data-table-context-menu.service';
import { TerraDataTableBaseService } from './terra-data-table-base.service';
import { TerraDataTableHeaderCellInterface } from './interfaces/terra-data-table-header-cell.interface';
import { TerraDataTableRowInterface } from './interfaces/terra-data-table-row.interface';
import { TerraDataTableSortOrderEnum } from './enums/terra-data-table-sort-order.enum';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraHrefTypeInterface } from './interfaces/terra-href-type.interface';
import {
    isArray,
    isNullOrUndefined
} from 'util';
import { TerraTextAlignEnum } from './enums/terra-text-align.enum';
import { StringHelper } from '../../../helpers/string.helper';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import { TerraHrefTypeEnum } from './enums/terra-href-type.enum';
import {
    debounceTime,
    filter,
    tap
} from 'rxjs/operators';
import { TerraBaseTable } from '../terra-base-table';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraDataTableTextInterface } from './interfaces/terra-data-table-text.interface';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';
import { TerraDataTableContextMenuEntryInterface } from './context-menu/data/terra-data-table-context-menu-entry.interface';


@Component({
    selector:   'terra-data-table',
    template:   require('./terra-data-table.component.html'),
    styles:     [require('./terra-data-table.component.scss')],
    providers:  [TerraDataTableContextMenuService],
})
export class TerraDataTableComponent<T, P> extends TerraBaseTable<T> implements OnInit, OnChanges
{
    /**
     * @description Mandatory service that is used to request the table data from the server
     */
    @Input()
    public inputService:TerraDataTableBaseService<T, P>;
    /**
     * @description List of header cell elements
     */
    @Input()
    public inputHeaderList:Array<TerraDataTableHeaderCellInterface> = [];
    /**
     * @description enables the user to sort the table by selected columns
     * @default false
     */
    @Input()
    public inputIsSortable:boolean = false;
    /**
     * @description shows checkboxes in the table, to be able to select any row
     * @default true
     */
    @Input()
    public inputHasCheckboxes:boolean = true;
    /**
     * @description show/hides the pager above the table
     * @default true
     */
    @Input()
    public inputHasPager:boolean = true;

    /**
     * @description context menu for rows
     */
    @Input()
    public inputContextMenu:Array<TerraDataTableContextMenuEntryInterface<T>> = [];

    protected columnHeaderClicked:EventEmitter<TerraDataTableHeaderCellInterface> = new EventEmitter<TerraDataTableHeaderCellInterface>();

    protected readonly refType:{} = TerraHrefTypeEnum;
    protected readonly checkboxColumnWidth:number = 25;

    protected get rowList():Array<TerraDataTableRowInterface<T>>
    {
        return !isNullOrUndefined(this.inputService) ? this.inputService.rowList : [];
    }

    /**
     * @description Initialization routine. It sets up the pager.
     */
    public ngOnInit():void
    {
        if(isNullOrUndefined(this.inputService))
        {
            console.error(`No 'inputService' given. This service is mandatory to display data in the table`);
            return;
        }

        this.columnHeaderClicked.pipe(
            filter((header:TerraDataTableHeaderCellInterface) =>
            {
                // change sorting column and order only if no request is pending and sortBy attribute is given
                return !this.inputService.requestPending && this.inputIsSortable && !isNullOrUndefined(header.sortBy);
            }),
            tap((header:TerraDataTableHeaderCellInterface) => this.changeSortingColumn(header)),
            debounceTime(400)
        ).subscribe(() => this.getResults());
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

    protected checkTooltipPlacement(placement:string):string // TODO: pipe?
    {
        if(!StringHelper.isNullUndefinedOrEmpty(placement))
        {
            return placement;
        }

        return TerraPlacementEnum.TOP;
    }

    protected get isTableDataAvailable():boolean
    {
        return this.rowList && this.rowList.length > 0;
    }

    protected doPaging():void
    {
        // request data from server
        this.getResults();

        // reset row selections
        this.resetSelectedRows();
    }

    protected getCellDataType(data:any):string
    {
        function isRefType(arg:any):arg is TerraHrefTypeInterface
        {
            return !isNullOrUndefined(arg)
                   && !isNullOrUndefined(arg.type) && typeof arg.type === 'string'
                   && !isNullOrUndefined(arg.value)
                   && (typeof arg.value === 'string' || typeof arg.value === 'number' || typeof arg.value === 'function');
        }

        function isTextType(arg:any):arg is TerraDataTableTextInterface
        {
            return !isNullOrUndefined(arg) && !isNullOrUndefined(arg.caption) && typeof arg.caption === 'string';
        }

        function isTagArray(arg:any):arg is Array<TerraTagInterface>
        {
            // check if it is an array
            if(!isArray(arg))
            {
                return false;
            }

            // check if every element of the array implements the tag interface
            let implementsInterface:boolean = arg.every((elem:any) =>
            {
                return !isNullOrUndefined(elem.name) && typeof elem.name === 'string';
            });

            return !isNullOrUndefined(arg) && implementsInterface;
        }

        function isButtonArray(arg:any):arg is Array<TerraButtonInterface>
        {
            // check if it is an array
            if(!isArray(arg))
            {
                return false;
            }

            // check if every element of the array implements the button interface
            let implementsInterface:boolean = arg.every((elem:any) =>
            {
                return !isNullOrUndefined(elem.clickFunction) && typeof elem.clickFunction === 'function';
            });

            return !isNullOrUndefined(arg) && implementsInterface;
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

    private changeSortingColumn(header:TerraDataTableHeaderCellInterface):void
    {
        if(isNullOrUndefined(this.inputService))
        {
            return;
        }

        // clicked on the same column?
        if(this.inputService.sortBy === header.sortBy)
        {
            // only change sorting order
            this.toggleSortingOrder();
        }
        else
        {
            this.inputService.sortBy = header.sortBy;
            this.inputService.sortOrder = TerraDataTableSortOrderEnum.descending; // default is descending
        }
    }

    private toggleSortingOrder():void
    {
        this.inputService.sortOrder = this.inputService.sortOrder === TerraDataTableSortOrderEnum.descending ?
            TerraDataTableSortOrderEnum.ascending :
            TerraDataTableSortOrderEnum.descending;
    }

    private resetSorting():void
    {
        // sort by the first sortable column, if available
        let defaultSortColumn:TerraDataTableHeaderCellInterface = this.getFirstSortableColumn();
        if(!isNullOrUndefined(this.inputService) && this.inputHeaderList && defaultSortColumn)
        {
            this.inputService.sortBy = defaultSortColumn.sortBy;
            this.inputService.sortOrder = TerraDataTableSortOrderEnum.descending;
        }
    }

    private getFirstSortableColumn():TerraDataTableHeaderCellInterface
    {
        // check if header list is given
        if(this.inputHeaderList)
        {
            // find first header cell where sortBy attribute is given
            return this.inputHeaderList.find((header:TerraDataTableHeaderCellInterface) => !isNullOrUndefined(header.sortBy));
        }

        // return null if nothing is found
        return null;
    }

    private getResults():void
    {
        if(!isNullOrUndefined(this.inputService))
        {
            this.inputService.getResults();
        }
    }

    protected getTextAlign(item:TerraDataTableHeaderCellInterface):TerraTextAlignEnum // TODO: Pipe?
    {
        if(!isNullOrUndefined(item) && !isNullOrUndefined(item.textAlign))
        {
            return item.textAlign;
        }
        else
        {
            return TerraTextAlignEnum.LEFT;
        }
    }

    protected isSortable(header:TerraDataTableHeaderCellInterface):boolean
    {
        if(isNullOrUndefined(header))
        {
            return false;
        }
        return this.inputIsSortable && !isNullOrUndefined(header.sortBy);
    }

    protected isUnsorted(header:TerraDataTableHeaderCellInterface):boolean
    {
        return this.isSortable(header) && header.sortBy !== this.inputService.sortBy;
    }

    private isSorted(header:TerraDataTableHeaderCellInterface, sortOrder:TerraDataTableSortOrderEnum):boolean
    {
        return this.isSortable(header) && header.sortBy === this.inputService.sortBy && this.inputService.sortOrder === sortOrder;
    }

    protected isSortedAsc(header:TerraDataTableHeaderCellInterface):boolean
    {
        return this.isSorted(header, TerraDataTableSortOrderEnum.ascending);
    }

    protected isSortedDesc(header:TerraDataTableHeaderCellInterface):boolean
    {
        return this.isSorted(header, TerraDataTableSortOrderEnum.descending);
    }
}
