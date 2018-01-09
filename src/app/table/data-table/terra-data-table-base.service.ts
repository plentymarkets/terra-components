import { TerraBaseService } from '../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { Http } from '@angular/http';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { TerraDataTableSortOrder } from './terra-data-table-sort-order.enum';

/**
 * @author pweyrich
 */
export abstract class TerraDataTableBaseService<T,P> extends TerraBaseService
{
    public requestPending:boolean;
    public onSuccessFunction:(res:Array<T>) => void;
    public pagingData:TerraPagerInterface;
    public pagingSizes:Array<TerraSelectBoxValueInterface>;
    public defaultPagingSize:number;
    public filterParameter:P;
    public sortBy:string;
    public sortOrder:TerraDataTableSortOrder;

    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService, private _httpService:Http)
    {
        super(_loadingSpinnerService, _httpService, '');
    }

    /**
     * @description Updates the stored paging data with the given data
     * @param {TerraPagerInterface} pagerData
     */
    public updatePagingData(pagerData:TerraPagerInterface)
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
     * @param {boolean} fromFilter
     * @returns {Observable<TerraPagerInterface>}
     */
    public getResults(fromFilter?:boolean):Observable<TerraPagerInterface>
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
        if(fromFilter)
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
        let request = this.requestTableData(params);
        request.subscribe(
            (res:TerraPagerInterface) =>
            {
                this.updatePagingData(res);
                this.onSuccessFunction(res.entries);
            },
            (error:any) => {},
            () => this.requestPending = false
        );

        return request;
    }

    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {TerraPagerParameterInterface} params
     * @returns {Observable<TerraPagerInterface>}
     */
    public abstract requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface>
}