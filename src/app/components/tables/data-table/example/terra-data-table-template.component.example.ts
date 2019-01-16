import {
    Component,
    OnInit
} from '@angular/core';
import {
    TerraButtonInterface,
    TerraDataTableContextMenuEntryInterface,
    TerraDataTableHeaderCellInterface,
    TerraDataTableRowInterface,
    TerraTextAlignEnum
} from '../../../../..';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraDataTableTemplateServiceExample } from './terra-data-table-template.service.example';

@Component({
    selector:    'terra-data-table-template-example',
    template: require('./terra-data-table-template.component.example.html'),
    styles:   [require('./terra-data-table-template.component.example.scss')],
    providers:   [TerraDataTableTemplateServiceExample]
})
export class TerraDataTableTemplateComponentExample implements OnInit
{
    protected readonly headerList:Array<TerraDataTableHeaderCellInterface>;
    protected readonly contextMenu:Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>>;

    protected noResultButtons:Array<TerraButtonInterface> = [];
    protected noResultTextPrimary:string;
    protected noResultTextSecondary:string;

    protected showGroupFunction:boolean = false;

    protected editIndex:number;

    protected selectedRows:Array<TerraDataTableRowInterface<TerraDataTableExampleInterface>>;

    constructor(public dataTableService:TerraDataTableTemplateServiceExample)
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
        this.dataTableService.getResults(true);

        this.noResultButtons = [{
            caption:       'Add',
            isHighlighted: false,
            icon:          'icon-add',
            clickFunction: ():void => this.addEntry()
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
        this.dataTableService.addEntry();
        this.dataTableService.getResults();
    }

    protected resetSorting():void
    {
        this.dataTableService.resetSortParams();
        this.dataTableService.getResults(true);
    }

    protected executeGroupFunction(selectedRows:Array<TerraDataTableRowInterface<TerraDataTableExampleInterface>>):void
    {
        console.log(selectedRows);
    }

    protected buttonClicked(row:TerraDataTableRowInterface<TerraDataTableExampleInterface>):void
    {
        console.log(row.data.id + ' button clicked');
    }

    protected isEdited(index:number):boolean
    {
        return index === this.editIndex;
    }

    protected startEditing(index:number):void
    {
        this.editIndex = index;
    }

    protected stopEditing():void
    {
        this.editIndex = undefined;
    }
}
