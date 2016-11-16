import {
    Component,
    Input
} from '@angular/core';
import { TerraSimpleTableHeaderCellInterface } from './cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from './row/terra-simple-table-row.interface';

@Component({
               selector: 'terra-simple-table',
               styles:   [require('./terra-simple-table.component.scss').toString()],
               template: require('./terra-simple-table.component.html')
           })

export class TerraSimpleTableComponent
{
    private _headerList:Array<TerraSimpleTableHeaderCellInterface>;
    private _rowList:Array<TerraSimpleTableRowInterface>;
    @Input() inputUseHighlighting:boolean = false;
    @Input() inputIsStriped:boolean = false;
    
    constructor()
    {
    }
    
    public get headerList():Array<TerraSimpleTableHeaderCellInterface>
    {
        return this._headerList;
    }
    
    public set headerList(value:Array<TerraSimpleTableHeaderCellInterface>)
    {
        this._headerList = value;
    }
    
    public get rowList():Array<TerraSimpleTableRowInterface>
    {
        return this._rowList;
    }
    
    public set rowList(value:Array<TerraSimpleTableRowInterface>)
    {
        this._rowList = value;
    }
    
    public deleteRow(rowToDelete:TerraSimpleTableRowInterface):void
    {
        let index = this.rowList.indexOf(rowToDelete);
        
        this.rowList.splice(index, 1);
    }
}
