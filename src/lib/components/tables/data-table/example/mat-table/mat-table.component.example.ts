import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraDataTableServiceExample } from '../terra-data-table.service.example';
import { TerraDataTableExampleInterface } from '../terra-data-table.interface.example';
import { SelectionModel } from '@angular/cdk/collections';
import {
    MatSort,
    MatTableDataSource,
    Sort
} from '@angular/material';
import { TerraDataTableContextMenuService } from '../../context-menu/terra-data-table-context-menu.service';
import { TerraDataTableContextMenuEntryInterface } from '../../context-menu/data/terra-data-table-context-menu-entry.interface';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnConfigInterface } from '../../../config/data/column-config.interface';

@Component({
    selector:  'tc-mat-table-example',
    template:  require('./mat-table.component.example.html'),
    styles:    [require('./mat-table.component.example.scss')],
    providers: [TerraDataTableServiceExample,
                TerraDataTableContextMenuService]
})
// TODO remove every example before release?
export class MatTableComponentExample implements OnInit
{
    protected data:Array<TerraDataTableExampleInterface> = [];
    protected dataSource:MatTableDataSource<TerraDataTableExampleInterface>;
    protected columns:Array<ColumnConfigInterface>;
    protected displayedColumns:Array<string>;
    protected selection:SelectionModel<TerraDataTableExampleInterface> =
        new SelectionModel<TerraDataTableExampleInterface>(true, []);
    protected readonly contextMenu:Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>>;

    @ViewChild(MatSort)
    private sort:MatSort;

    private previousIndex:number;

    constructor()
    {
        this.contextMenu = this.createContextMenu();
        this.columns = this.createColumns();
        this.displayedColumns = this.createHeaderList();
        this.addEntries();
        this.dataSource = new MatTableDataSource<TerraDataTableExampleInterface>(this.data);
    }

    public ngOnInit():void
    {
        this.sort.disableClear = true;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe((sort:Sort) =>
        {
            console.log('Here can the sort direction be saved!');
            console.log('Current column: ' + sort.active);
            console.log('Current direction: ' + sort.direction);
            console.log('---------------------------------');
        });
    }

    protected isAllSelected():boolean
    {
        const numSelected:number = this.selection.selected.length;
        const numRows:number = this.dataSource.data.length;
        return numSelected === numRows;
    }

    protected masterToggle():void
    {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach((row:TerraDataTableExampleInterface) => this.selection.select(row));
    }

    protected onDeleteClick(element:any):void
    {
        alert('ROW with ID `' + element.id + '` clicked. (DELETE)');
    }

    protected dragStarted(key:string):void
    {
        this.previousIndex = this.displayedColumns.indexOf(key);
    }

    protected dropListDropped(key:string):void
    {
        moveItemInArray(this.displayedColumns, this.previousIndex, this.displayedColumns.indexOf(key));
    }

    private createColumns():Array<ColumnConfigInterface>
    {
        return [
            {
                key:                'select',
                hideInColumnConfig: true
            },
            {
                key:     'id',
                caption: 'ID',
                draggable: true
            },
            {
                key:     'value',
                caption: 'Value',
                draggable: true
            },
            {
                key:     'email',
                caption: 'Email',
                draggable: true
            },
            {
                key:     'link',
                caption: 'Link',
                draggable: true
            },
            {
                key:     'actions',
                caption: 'Aktionen'
            }
        ];
    }

    private createHeaderList():Array<string>
    {
        return this.columns.filter((column:ColumnConfigInterface) => !column.hidden).map((column:ColumnConfigInterface) => column.key);
    }

    private addEntries():void
    {
        for(let i:number = 0; i < 50; i++)
        {
            this.data.push(
                {
                    id:       i,
                    value:    Math.random(),
                    mail:     `email${i}@random.de`,
                    link:     'https://www.google.de',
                    disabled: i === 3
                }
            );
        }
    }

    private createContextMenu():Array<TerraDataTableContextMenuEntryInterface<TerraDataTableExampleInterface>>
    {
        return [{
            title:         'Show alert',
            clickFunction: (data:TerraDataTableExampleInterface):void => alert(`The rows value is ${data.value}`)
        }];
    }
}
