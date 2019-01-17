import {
    Component,
    OnInit
} from '@angular/core';
import { TerraDataTableServiceExample } from './terra-data-table.service.example';
import { TerraDataTableHeaderCellInterface } from '../interfaces/terra-data-table-header-cell.interface';
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { TerraDataTableContextMenuEntryInterface } from '../context-menu/data/terra-data-table-context-menu-entry.interface';

@Component({
    selector:  'terra-data-table-example',
    template:  require('./terra-data-table.component.example.html'),
    styles:    [require('./terra-data-table.component.example.scss')],
    providers: [TerraDataTableServiceExample]
})
export class TerraDataTableComponentExample implements OnInit
{
    protected readonly headerList:Array<TerraDataTableHeaderCellInterface>;
    protected readonly contextMenu:Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>>;

    protected noResultButtons:Array<TerraButtonInterface> = [];
    protected noResultTextPrimary:string;
    protected noResultTextSecondary:string;

    protected showGroupFunction:boolean = false;

    constructor(protected service:TerraDataTableServiceExample)
    {
        this.headerList = this.createHeaderList();
        this.contextMenu = this.createContextMenu();
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
    }

    public onSearchBtnClicked():void
    {
        this.service.getResults(true);

        this.noResultButtons = [{
            caption:       'Add',
            isHighlighted: false,
            icon:          'icon-add',
            clickFunction: ():void => this.addEntries()
        }];

        this.noResultTextPrimary = 'No entries found';
        this.noResultTextSecondary = 'Add a new entry';
    }


    private createHeaderList():Array<TerraDataTableHeaderCellInterface>
    {
        return [
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

    private createContextMenu():Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>>
    {
        return [{
            title:         'Show alert',
            clickFunction: (data:TerraDataTableExampleInterface):void => alert(`The rows value is ${data.value}`)
        }];
    }

    protected addEntry():void
    {
        this.service.addEntry();
        this.service.getResults();
    }

    protected addEntries():void
    {
        for(let i:number = 0; i < 50; i++)
        {
            this.service.addEntry();
        }
        this.service.getResults();
    }

    protected resetSorting():void
    {
        this.service.resetSortParams();
        this.service.getResults(true);
    }

    protected executeGroupFunction(selectedRows:Array<TerraDataTableRowInterface<TerraDataTableExampleInterface>>):void
    {
        console.log(selectedRows);
    }

}
