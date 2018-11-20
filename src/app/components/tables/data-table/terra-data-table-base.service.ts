import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { TerraDataTableSortOrderEnum } from './enums/terra-data-table-sort-order.enum';
import { TerraDataTableRowInterface } from './interfaces/terra-data-table-row.interface';
import {
    finalize,
    map,
    tap
} from 'rxjs/operators';
import { StringHelper } from '../../../helpers/string.helper';
import { terraPagerDefaultPagingSizes } from '../../pager/data/terra-pager-default-paging-sizes';

/**
 * @author pweyrich
 */
export abstract class TerraDataTableBaseService<T, P>
{
    public filterParameter:P;
    public sortBy:string;
    public sortOrder:TerraDataTableSortOrderEnum;

    private _rowList:Array<TerraDataTableRowInterface<T>> = [];
    private _requestPending:boolean;
    private _pagingData:TerraPagerInterface<T>;
    private _pagingSizes:Array<TerraSelectBoxValueInterface>;
    private _defaultPagingSize:number;

    constructor()
    {
        this._pagingData = {
            page:           1,
            itemsPerPage:   25,
            totalsCount:    1,
            isLastPage:     true,
            lastPageNumber: 1,
            lastOnPage:     1,
            firstOnPage:    1
        };
        this.filterParameter = {} as P;
    }

    public get defaultPagingSize():number
    {
        return this._defaultPagingSize;
    }

    public set defaultPagingSize(value:number)
    {
        this._defaultPagingSize = value;
        this._pagingData.itemsPerPage = this.itemsPerPage;
    }

    public get pagingSizes():Array<TerraSelectBoxValueInterface>
    {
        return this._pagingSizes || terraPagerDefaultPagingSizes;
    }

    public set pagingSizes(value:Array<TerraSelectBoxValueInterface>)
    {
        this._pagingSizes = value;
        this._pagingData.itemsPerPage = this.itemsPerPage;
    }

    /**
     * @readonly
     */
    public get pagingData():TerraPagerInterface<T>
    {
        return this._pagingData;
    }

    /**
     * @readonly
     */
    public get requestPending():boolean
    {
        return this._requestPending;
    }

    /**
     * @readonly
     */
    public get rowList():Array<TerraDataTableRowInterface<T>>
    {
        return this._rowList;
    }

    private get itemsPerPage():number
    {
        let itemsPerPage:number = 25;
        if(this._defaultPagingSize && this.pagingSizes.some((size:TerraSelectBoxValueInterface) => +size.value === this._defaultPagingSize))
        {
            itemsPerPage = this._defaultPagingSize;
        }
        else if(this._pagingSizes && this._pagingSizes[0])
        {
            itemsPerPage = this._pagingSizes[0].value;
        }
        return itemsPerPage;
    }

    /**
     * @description Updates the stored paging data with the given data
     * @param {TerraPagerInterface} pagerData
     */
    public updatePagingData(pagerData:TerraPagerInterface<T>):void
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
    }

    /**
     * @description Wrapper for the abstract requestTableData method. All the default behaviour when retrieving data is implemented here.
     * @param loadFirstPage
     */
    public getResults(loadFirstPage?:boolean):void
    {
        // initialize parameters with filter params
        let params:P = this.filterParameter;

        // set page and itemsPerPage attribute
        // IMPORTANT: this must be done after the filter parameters have been applied,...
        // since they can also have a page and itemsPerPage attribute, but those should be ignored!!
        if(this._pagingData && this._pagingData.page && this._pagingData.itemsPerPage)
        {
            params['page'] = this._pagingData.page;
            params['itemsPerPage'] = this._pagingData.itemsPerPage;
        }

        // if search is triggered by a filter component, always retrieve the first page
        // TODO: maybe implement another behavior by checking if filter params have changed
        if(loadFirstPage)
        {
            params['page'] = 1;
        }

        // add sortBy attribute to pager params
        if(!StringHelper.isNullUndefinedOrEmpty(this.sortBy))
        {
            params['sortBy'] = this.sortBy;

            // sort order is only considered if sortBy attribute is given
            if(this.sortOrder)
            {
                params['sortOrder'] = this.sortOrder;
            }
        }

        // request table data from the server
        this._requestPending = true;
        this.requestTableData(params).pipe(
            tap((res:TerraPagerInterface<T>) => this.updatePagingData(res)),
            map((res:TerraPagerInterface<T>) => res.entries.map((entry:T) => this.dataToRowMapping(entry))),
            finalize(() => this._requestPending = false)
        ).subscribe((rowList:Array<TerraDataTableRowInterface<T>>) => this._rowList = rowList);
    }

    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {TerraPagerParameterInterface} params
     * @returns {Observable<TerraPagerInterface<T>>}
     */
    public abstract requestTableData(params?:P):Observable<TerraPagerInterface<T>>;

    /**
     * @description Placeholder for the specific data mapping method.
     * The response data is mapped to the `TerraDataTableRowInterface` in order to be able to display the data in the table.
     * @param {T} res
     * @returns {TerraDataTableRowInterface<T>}
     */
    public abstract dataToRowMapping(res:T):TerraDataTableRowInterface<T>;
}
