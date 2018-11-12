import { Injectable } from '@angular/core';
import { TerraDataTableBaseService } from '../terra-data-table-base.service';
import { TerraPagerParameterInterface } from '../../../pager/data/terra-pager.parameter.interface';
import { Observable } from 'rxjs/Observable';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';
import { TerraDataTableSortOrderEnum } from '../enums/terra-data-table-sort-order.enum';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraHrefTypeEnum } from '../enums/terra-href-type.enum';
import { TerraDataTableCellInterface } from '../interfaces/terra-data-table-cell.interface';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';

@Injectable()
export class TerraDataTableServiceExample extends TerraDataTableBaseService<TerraDataTableExampleInterface, TerraPagerParameterInterface>
{
    private data:Array<TerraDataTableExampleInterface> = [];

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

    private applySorting(data:Array<TerraDataTableExampleInterface>, sortBy:string, sortOrder:TerraDataTableSortOrderEnum):void
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
        data.sort(comparator);
    }

    public addEntry():void
    {
        this.data.push(
            {
                id:    this.data.reduce((a:number, b:TerraDataTableExampleInterface) => Math.max(a, b.id), 0) + 1,
                value: Math.random()
            }
        );
    }

    public dataToRowMapping(entry:TerraDataTableExampleInterface):TerraDataTableRowInterface<TerraDataTableExampleInterface>
    {
        let cellList:Array<TerraDataTableCellInterface> = [
            {
                data: entry.id
            },
            {
                data: entry.value
            },
            {
                data: {
                    type:  TerraHrefTypeEnum.email,
                    value: 'example-mail@host.com'
                }
            },
            {
                data: [
                    {
                        icon:          'icon-add',
                        clickFunction: ():void => console.log('clicked')
                    }
                ]
            }
        ];

        return {
            cellList:      cellList,
            data:          entry,
            clickFunction: ():void =>
                           {
                               console.log(`Row with id ${entry.id} clicked`);
                           }
        };
    }
}
