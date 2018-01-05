import { Injectable } from '@angular/core';
import { TerraDataTableBaseService } from '../terra-data-table-base.service';
import { TerraPagerParameterInterface } from '../../../pager/data/terra-pager.parameter.interface';
import { Observable } from 'rxjs/Observable';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';
import { TerraDataTableSortOrder } from '../terra-data-table-sort-order.enum';

@Injectable()
export class TerraDataTableServiceExample extends TerraDataTableBaseService<{ id:number, value:number }, TerraPagerParameterInterface>
{
    private data:[{ id:number, value:number }] = [
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

    public addEntry():void
    {
        this.data.push(
            {
                id: this.data.reduce((a,b) => { return Math.max(a, b.id)}, 0) + 1,
                value: Math.random()
            }
        )
    }

    public requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface>
    {
        let results:TerraPagerInterface =
            {
                page:           1,
                itemsPerPage:   25,
                totalsCount:    4,
                isLastPage:     true,
                lastPageNumber: 1,
                firstOnPage:    1,
                lastOnPage:     4,
                entries:        this.data
            };

        if(params)
        {
            if(params['sortBy'])
            {
                let sortBy:string = params['sortBy'];
                if(params['sortOrder'])
                {
                    let sortOrder:TerraDataTableSortOrder = params['sortOrder'];
                    let comparator:(a:any, b:any) => number;
                    if(sortOrder === TerraDataTableSortOrder.ASCENDING)
                    {
                        comparator = (a, b) => a[sortBy] - b[sortBy];
                    }
                    else
                    {
                        comparator = (a, b) => b[sortBy] - a[sortBy];
                    }
                    results.entries.sort(comparator)
                }
            }
        }

        return Observable.of(results);
    }
}