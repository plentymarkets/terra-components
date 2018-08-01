import { Injectable } from '@angular/core';
import { TerraDataTableBaseService } from '../terra-data-table-base.service';
import { TerraPagerParameterInterface } from '../../../pager/data/terra-pager.parameter.interface';
import { Observable } from 'rxjs/Observable';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';
import { TerraDataTableSortOrder } from '../terra-data-table-sort-order.enum';
import { TerraLoadingSpinnerService } from '../../../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';

@Injectable()
export class TerraDataTableServiceExample extends TerraDataTableBaseService<{ id:number, value:number }, TerraPagerParameterInterface>
{
    private data:Array<{ id:number, value:number }> = [
        {
            id:    1,
            value: Math.random()
        },
        {
            id:    2,
            value: Math.random()
        },
        {
            id:    3,
            value: Math.random()
        }];

    constructor(private _spinner:TerraLoadingSpinnerService, private _http:Http)
    {
        super(_spinner, _http);
    }

    // This method usually just requests data from the server via REST using another service, which has to be injected in the constructor
    public requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface>
    {
        // build up paging information
        let firstOnPage:number = Math.max((params.page - 1) * params.itemsPerPage, 0);
        let lastOnPage:number = Math.min(params.page * params.itemsPerPage, this.data.length);
        let lastPageNumber:number = Math.ceil(this.data.length / params.itemsPerPage);

        let results:TerraPagerInterface =
            {
                page:           params.page,
                itemsPerPage:   params.itemsPerPage,
                totalsCount:    this.data.length,
                isLastPage:     params.page === lastPageNumber,
                lastPageNumber: lastPageNumber,
                firstOnPage:    firstOnPage + 1,
                lastOnPage:     lastOnPage,
                entries:        this.data
            };

        // apply sorting if sorting parameters are given
        if(params && params['sortBy'] && params['sortOrder'])
        {
            this.applySorting(results.entries, params['sortBy'], params['sortOrder']);
        }

        // cut data that is not included in the requested page
        results.entries = results.entries.slice(firstOnPage, lastOnPage);

        // return data
        return Observable.of(results);
    }

    private applySorting(data:Array<any>, sortBy:string, sortOrder:TerraDataTableSortOrder):void
    {
        let comparator:(a:any, b:any) => number;
        if(sortOrder === TerraDataTableSortOrder.ASCENDING)
        {
            comparator = (a, b) => a[sortBy] - b[sortBy];
        }
        else
        {
            comparator = (a, b) => b[sortBy] - a[sortBy];
        }
        data.sort(comparator);
    }

    public addEntry():void
    {
        this.data.push(
            {
                id:    this.data.reduce((a:number, b:{ id:number, value:number }) => { return Math.max(a, b.id) }, 0) + 1,
                value: Math.random()
            }
        );
    }
}