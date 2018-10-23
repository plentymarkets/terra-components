import {
    Component,
    OnInit
} from '@angular/core';
import { TerraDataTableServiceExample } from './terra-data-table.service.example';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { TerraDataTableHeaderCellInterface } from '../interfaces/terra-data-table-header-cell.interface';
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';
import { TerraDataTableCellInterface } from '../interfaces/terra-data-table-cell.interface';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';
import { TerraRefTypeEnum } from '../enums/terra-ref-type.enum';
import { DataTableExampleInterface } from './terra-data-table.interface.example';

@Component({
    selector:  'terra-data-table-example',
    template:  require('./terra-data-table.component.example.html'),
    styles:    [require('./terra-data-table.component.example.scss')],
    providers: [TerraDataTableServiceExample]
})
export class TerraDataTableComponentExample implements OnInit
{
    protected headerList:Array<TerraDataTableHeaderCellInterface>;

    protected noResultButtons:Array<TerraButtonInterface> = [];
    protected noResultTextPrimary:string;
    protected noResultTextSecondary:string;

    constructor(private service:TerraDataTableServiceExample)
    {
    }

    public ngOnInit():void
    {
        this.noResultButtons = [{
            caption:       'Search',
            isHighlighted: true,
            icon:          'icon-search',
            clickFunction: ():void => this.onSearchBtnClicked()
        }];

        this.noResultTextPrimary = 'No results available';
        this.noResultTextSecondary = 'Search to refresh';

        this.initTableHeader();

        this.service.defaultPagingSize = 25;
        this.service.dataToRowMapping = (entry:DataTableExampleInterface):TerraDataTableRowInterface<DataTableExampleInterface> =>
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
                        type:  TerraRefTypeEnum.email,
                        value: 'pascal.weyrich@plentymarkets.com'
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
        };
    }

    public onSearchBtnClicked():void
    {
        this.service.getResults();

        this.noResultButtons = [{
            caption:       'Add',
            isHighlighted: false,
            icon:          'icon-add',
            clickFunction: ():void => this.service.addEntry()
        }];

        this.noResultTextPrimary = 'No entries found';
        this.noResultTextSecondary = 'Add a new entry';
    }


    private initTableHeader():void
    {
        this.headerList = [
            {
                caption: 'ID',
                sortBy:  'id',
                width:   20
            },
            {
                caption:   'value',
                sortBy:    'value',
                width:     20,
                textAlign: TerraTextAlignEnum.LEFT
            },
            {
                caption: 'email',
                width:   20
            },
            {
                caption: 'buttons',
                width:   20
            }
        ];
    }

    protected addEntry():void
    {
        this.service.addEntry();
        this.service.getResults();
    }
}
