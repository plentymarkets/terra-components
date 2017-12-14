import { TerraBaseService } from '../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { Http } from '@angular/http';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { TerraDataTableSortOrder } from './terra-data-table-sort-order.enum';
import { TerraDataTableHeaderCellInterface } from './cell/terra-data-table-header-cell.interface';

export abstract class TerraDataTableBaseService<T> extends TerraBaseService
{
    public requestPending:boolean;
    public onSuccessFunction:(res:Array<T>) => void;
    public pagingData:TerraPagerInterface;
    public pagingSize:Array<TerraSelectBoxValueInterface>;
    public defaultPagingSize:number;
    public filterParameter:TerraPagerParameterInterface;
    public sortBy:string;
    public sortOrder:TerraDataTableSortOrder;

    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService, private _httpService:Http)
    {
        super(_loadingSpinnerService, _httpService, '');
    }

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

    public getResults():Observable<TerraPagerInterface>
    {
        // initialize pagination parameters
        let params:TerraPagerParameterInterface = {};
        if(this.pagingData && this.pagingData.page && this.pagingData.itemsPerPage)
        {
            params = {
                page:         this.pagingData.page,
                itemsPerPage: this.pagingData.itemsPerPage
            };
        }

        // use filter params if available
        if(this.filterParameter && this.filterParameter.page && this.pagingData.itemsPerPage)
        {
            params = this.filterParameter;
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

    public abstract requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface>
}