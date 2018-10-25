import {
    Component,
    OnInit
} from '@angular/core';
import { TerraDataTableServiceExample } from './terra-data-table.service.example';
import { TerraDataTableHeaderCellInterface } from '../interfaces/terra-data-table-header-cell.interface';
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';
import { TerraDataTableRowInterface } from '../../../../..';
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

    protected showGroupFunction:boolean = false;

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
    }

    public onSearchBtnClicked():void
    {
        this.service.getResults(true);

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

    protected executeGroupFunction(selectedRows:Array<TerraDataTableRowInterface<DataTableExampleInterface>>):void
    {
        console.log(selectedRows);
    }
}
