import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TerraSimpleTableComponent } from '../terra-simple-table.component';
import { TerraSimpleTableHeaderCellInterface } from '../cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from '../row/terra-simple-table-row.interface';
import { TerraSimpleTableCellInterface } from '../cell/terra-simple-table-cell.interface';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';


@Component({
    selector: 'terra-simple-table-example',
    templateUrl: './terra-simple-table.component.example.html',
    styleUrls: [ './terra-simple-table.component.example.scss'],
})
export class TerraSimpleTableComponentExample implements OnInit
{
    @ViewChild('table', { static: true })
    public table:TerraSimpleTableComponent<any>;

    public _selectedRows:Array<TerraSimpleTableHeaderCellInterface>;

    private _viewContainerRef:ViewContainerRef;
    private _headerList:Array<TerraSimpleTableHeaderCellInterface> = [];
    private _rowList:Array<TerraSimpleTableRowInterface<any>> = [];

    constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }

    public ngOnInit():void
    {
        for(let x:number = 0; x < 5; x++)
        {
            let cell:TerraSimpleTableHeaderCellInterface = {
                caption: 'header ' + x,
                width:   '100',
            };

            this.headerList.push(cell);
        }

        this.headerList.push({
            caption: 'buttons',
            width:   '100'
        });

        for(let i:number = 1; i < 10; i++)
        {
            let cellList:Array<TerraSimpleTableCellInterface> = [];

            for(let j:number = 0; j < 5; j++)
            {
                let cell:TerraSimpleTableCellInterface = {
                    caption: 'row' + i + 'testcell ' + j,
                    icon:    'icon-referrer_backend'
                };

                cellList.push(cell);
            }

            let buttonList:Array<TerraButtonInterface> = [];

            buttonList.push({
                caption:       'hallo',
                clickFunction: ():void =>
                               {
                                   alert('test');
                               }
            });

            let buttonCell:TerraSimpleTableCellInterface = {
                buttonList: buttonList
            };

            cellList.push(buttonCell);

            let row:TerraSimpleTableRowInterface<any> = {
                cellList: cellList,
                disabled: i % 3 === 0,
                selected: i % 2 === 0
            };

            this.rowList.push(row);
        }
    }

    public get headerList():Array<TerraSimpleTableHeaderCellInterface>
    {
        return this._headerList;
    }

    public get rowList():Array<TerraSimpleTableRowInterface<any>>
    {
        return this._rowList;
    }
}
