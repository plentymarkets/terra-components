import { TerraBaseService } from '../../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { Http } from '@angular/http';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { TerraDataTableSortOrder } from './enums/terra-data-table-sort-order.enum';
import { TerraDataTableRowInterface } from './interfaces/terra-data-table-row.interface';
import {
    finalize,
    map,
    tap
} from 'rxjs/operators';

/**
 * @author pweyrich
 */
export abstract class TerraDataTableBaseService<T, P> extends TerraBaseService
{
    public requestPending:boolean;
    public dataToRowMapping:(res:T) => TerraDataTableRowInterface<T>; // TODO: Naming
    public pagingData:TerraPagerInterface<T>;
    public pagingSizes:Array<TerraSelectBoxValueInterface>;
    public defaultPagingSize:number;
    public filterParameter:P;
    public sortBy:string;
    public sortOrder:TerraDataTableSortOrder;

    private _rowList:Array<TerraDataTableRowInterface<T>> = [];

    constructor(loadingSpinner:TerraLoadingSpinnerService, http:Http)
    {
        super(loadingSpinner, http, '');
    }

    public get rowList():Array<TerraDataTableRowInterface<T>>
    {
        return this._rowList;
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
     * @param firstPage
     */
    public getResults(firstPage?:boolean):void
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
        if(firstPage)
        {
            params.page = 1;
        }

        // add sortBy attribute to pager params
        if(this.sortBy && this.sortBy !== '')
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
            map((res:TerraPagerInterface<T>) => res.entries.map(this.dataToRowMapping)),
            finalize(() => this.requestPending = false)
        ).subscribe((rowList:Array<TerraDataTableRowInterface<T>>) => this._rowList = rowList);
    }

    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {TerraPagerParameterInterface} params
     * @returns {Observable<TerraPagerInterface>}
     */
    public abstract requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface<T>>;
}
