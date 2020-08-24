import { Component, OnInit } from '@angular/core';
import { TerraDataTableServiceExample } from './terra-data-table.service.example';
import { TerraDataTableHeaderCellInterface } from '../interfaces/terra-data-table-header-cell.interface';
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';
import { TerraDataTableExampleInterface } from './terra-data-table.interface.example';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import { TerraDataTableContextMenuEntryInterface } from '../context-menu/data/terra-data-table-context-menu-entry.interface';

@Component({
    selector: 'terra-data-table-example',
    templateUrl: './terra-data-table.component.example.html',
    styleUrls: ['./terra-data-table.component.example.scss'],
    providers: [TerraDataTableServiceExample]
})
export class TerraDataTableComponentExample implements OnInit {
    public readonly _headerList: Array<TerraDataTableHeaderCellInterface>;
    public readonly _contextMenu: Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>>;

    public _noResultButtons: Array<TerraButtonInterface> = [];
    public _noResultTextPrimary: string;
    public _noResultTextSecondary: string;

    public showGroupFunction: boolean = false;

    constructor(public _service: TerraDataTableServiceExample) {
        this._headerList = this._createHeaderList();
        this._contextMenu = this._createContextMenu();
    }

    public ngOnInit(): void {
        this._noResultButtons = [
            {
                caption: 'Search',
                isHighlighted: true,
                icon: 'icon-search',
                clickFunction: (): void => this._onSearchBtnClicked()
            }
        ];

        this._noResultTextPrimary = 'No results available';
        this._noResultTextSecondary = 'Search to refresh';
    }

    public _addEntry(): void {
        this._service.addEntry();
        this._service.getResults();
    }

    public _addEntries(): void {
        for (let i: number = 0; i < 500; i++) {
            this._service.addEntry();
        }
        this._service.getResults();
    }

    public _resetSorting(): void {
        this._service.resetSortParams();
        this._service.getResults(true);
    }

    public _executeGroupFunction(
        selectedRows: Array<TerraDataTableRowInterface<TerraDataTableExampleInterface>>
    ): void {
        console.log(selectedRows);
    }

    private _onSearchBtnClicked(): void {
        this._service.getResults(true);

        this._noResultButtons = [
            {
                caption: 'Add',
                isHighlighted: false,
                icon: 'icon-add',
                clickFunction: (): void => this._addEntries()
            }
        ];

        this._noResultTextPrimary = 'No entries found';
        this._noResultTextSecondary = 'Add a new entry';
    }

    private _createHeaderList(): Array<TerraDataTableHeaderCellInterface> {
        return [
            {
                caption: 'ID',
                sortBy: 'id',
                width: 20
            },
            {
                caption: 'value',
                sortBy: 'value',
                width: 200,
                textAlign: TerraTextAlignEnum.LEFT
            },
            {
                caption: 'email',
                width: 200
            },
            {
                caption: '',
                width: 10
            }
        ];
    }

    private _createContextMenu(): Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>> {
        return [
            {
                title: 'Show alert',
                clickFunction: (data: TerraDataTableExampleInterface): void => alert(`The rows value is ${data.value}`)
            }
        ];
    }
}
