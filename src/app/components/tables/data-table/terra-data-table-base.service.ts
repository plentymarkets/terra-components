import { TerraBaseService } from '../../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { Http } from '@angular/http';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { TerraDataTableSortOrderEnum } from './enums/terra-data-table-sort-order.enum';
import { TerraDataTableRowInterface } from './interfaces/terra-data-table-row.interface';
import {
    finalize,
    map,
    tap
} from 'rxjs/operators';
import { StringHelper } from '../../../helpers/string.helper';

/**
 * @author pweyrich
 */
export abstract class TerraDataTableBaseService<T, P> extends TerraBaseService
{
    public requestPending:boolean;
    public pagingData:TerraPagerInterface<T>;
    public pagingSizes:Array<TerraSelectBoxValueInterface>;
    public defaultPagingSize:number;
    public filterParameter:P;
    public sortBy:string;
    public sortOrder:TerraDataTableSortOrderEnum;

    private _rowList:Array<TerraDataTableRowInterface<T>> = [];

    constructor(loadingSpinner:TerraLoadingSpinnerService, http:Http)
    {
        super(loadingSpinner, http, '');

        this.initPagination();
    }

    public get rowList():Array<TerraDataTableRowInterface<T>>
    {
        return this._rowList;
    }

    /**
     * default initialization of the paging information which are stored in the input service
     */
    private initPagination():void
    {
        let itemsPerPage:number = 25;
        if(this.defaultPagingSize)
        {
            itemsPerPage = this.defaultPagingSize;
        }
        else if(this.pagingSizes && this.pagingSizes[0])
        {
            itemsPerPage = this.pagingSizes[0].value;
        }

        // init paging data
        this.updatePagingData({
            page:           1,
            itemsPerPage:   itemsPerPage,
            totalsCount:    1,
            isLastPage:     true,
            lastPageNumber: 1,
            lastOnPage:     1,
            firstOnPage:    1
        });
    }

    /**
     * @description Updates the stored paging data with the given data
     * @param {TerraPagerInterface} pagerData
     */
    public updatePagingData(pagerData:TerraPagerInterface<T>):void
    {
        this.pagingData = {
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
        // initialize pagination parameters
        let params:TerraPagerParameterInterface = {};

        // use filter params if available
        if(this.filterParameter)
        {
            params = this.filterParameter;
        }

        // set page and itemsPerPage attribute
        // IMPORTANT: this must be done after the filter parameters have been applied,...
        // since they can also have a page and itemsPerPage attribute, but those should be ignored!!
        if(this.pagingData && this.pagingData.page && this.pagingData.itemsPerPage)
        {
            params.page = this.pagingData.page;
            params.itemsPerPage = this.pagingData.itemsPerPage;
        }

        // if search is triggered by a filter component, always retrieve the first page
        // TODO: maybe implement another behavior by checking if filter params have changed
        if(loadFirstPage)
        {
            params.page = 1;
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
        this.requestPending = true;
        this.requestTableData(params).pipe(
            tap((res:TerraPagerInterface<T>) => this.updatePagingData(res)),
            map((res:TerraPagerInterface<T>) => res.entries.map((entry:T) => this.dataToRowMapping(entry))),
            finalize(() => this.requestPending = false)
        ).subscribe((rowList:Array<TerraDataTableRowInterface<T>>) => this._rowList = rowList);
    }

    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {TerraPagerParameterInterface} params
     * @returns {Observable<TerraPagerInterface>}
     */
    public abstract requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface<T>>;

    /**
     * @description Placeholder for the specific data mapping method.
     * The response data is mapped to the `TerraDataTableRowInterface` in order to be able to display the data in the table.
     * @param res
     */
    public abstract dataToRowMapping(res:T):TerraDataTableRowInterface<T>;
}
