import { Injectable } from '@angular/core';
import { TerraDataTableBaseService } from '../terra-data-table-base.service';
import { TerraPagerParameterInterface } from '../../../pager/data/terra-pager.parameter.interface';
import { Observable } from 'rxjs/Observable';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';
import { TerraDataTableSortOrderEnum } from '../enums/terra-data-table-sort-order.enum';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { isNullOrUndefined } from 'util';

@Injectable()
export class TerraDataTableTemplateServiceExample extends TerraDataTableBaseService<TerraDataTableExampleInterface, TerraPagerParameterInterface>
{
    private data:Array<TerraDataTableExampleInterface> = [];

    constructor()
    {
        super();
        this.defaultPagingSize = 50;
    }

    // This method usually just requests data from the server via REST using another service, which has to be injected in the constructor
    public requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface<TerraDataTableExampleInterface>>
    {
        // build up paging information
        let firstOnPage:number = Math.max((params.page - 1) * params.itemsPerPage, 0);
        let lastOnPage:number = Math.min(params.page * params.itemsPerPage, this.data.length);
        let lastPageNumber:number = Math.ceil(this.data.length / params.itemsPerPage);

        let results:TerraPagerInterface<TerraDataTableExampleInterface> = {
            page:           params.page,
            itemsPerPage:   params.itemsPerPage,
            totalsCount:    this.data.length,
            isLastPage:     params.page === lastPageNumber,
            lastPageNumber: lastPageNumber,
            firstOnPage:    firstOnPage + 1,
            lastOnPage:     lastOnPage,
        };

        // set default params if not given
        if(isNullOrUndefined(params))
        {
            params = {};
        }
        if(isNullOrUndefined(params['sortBy']))
        {
            params['sortBy'] = 'id';
        }
        if(isNullOrUndefined(params['sortOrder']))
        {
            params['sortOrder'] = TerraDataTableSortOrderEnum.descending;
        }

        // apply sorting
        let entries:Array<TerraDataTableExampleInterface> = this.applySorting(this.data, params['sortBy'], params['sortOrder']);

        // cut data that is not included in the requested page
        results.entries = entries.slice(firstOnPage, lastOnPage);

        // return data
        return Observable.of(results);
    }

    private applySorting(data:Array<TerraDataTableExampleInterface>, sortBy:string,
                         sortOrder:TerraDataTableSortOrderEnum):Array<TerraDataTableExampleInterface>
    {
        let comparator:(a:TerraDataTableExampleInterface, b:TerraDataTableExampleInterface) => number;
        if(sortOrder === TerraDataTableSortOrderEnum.ascending)
        {
            comparator = (a:TerraDataTableExampleInterface, b:TerraDataTableExampleInterface):number => a[sortBy] - b[sortBy];
        }
        else
        {
            comparator = (a:TerraDataTableExampleInterface, b:TerraDataTableExampleInterface):number => b[sortBy] - a[sortBy];
        }
        return data.sort(comparator);
    }

    public addEntry():void
    {
        for(let i:number = 0; i <= 50; i++)
        {
            this.data.push(
                {
                    id:    this.data.reduce((a:number, b:TerraDataTableExampleInterface) => Math.max(a, b.id), 0) + 1,
                    value: Math.random()
                }
            );
        }
    }

    public dataToRowMapping(entry:TerraDataTableExampleInterface):TerraDataTableRowInterface<TerraDataTableExampleInterface>
    {
        let data:any = entry;
        data.mail = data.value + '@test.com';

        return {
            cellList:      [],
            data:          data,
        };
    }
}
