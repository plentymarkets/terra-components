import {
    Component,
    Input
} from '@angular/core';
import { TerraSimpleTableHeaderCellInterface } from './cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from './row/terra-simple-table-row.interface';

@Component({
               selector: 'terra-simple-table',
               styles:   [require('./terra-simple-table.component.scss')],
               template: require('./terra-simple-table.component.html')
           })
export class TerraSimpleTableComponent
{
    @Input() inputHeaderList:Array<TerraSimpleTableHeaderCellInterface>;
    @Input() inputRowList:Array<TerraSimpleTableRowInterface>;
    @Input() inputUseHighlighting:boolean = false;
    @Input() inputIsStriped:boolean = false;

    constructor()
    {
    }

    /**
     * @deprecated
     *
     * @returns {Array<TerraSimpleTableHeaderCellInterface>}
     */
    public get headerList():Array<TerraSimpleTableHeaderCellInterface>
    {
        return this.inputHeaderList;
    }

    /**
     * @deprecated
     *
     * @param value
     */
    public set headerList(value:Array<TerraSimpleTableHeaderCellInterface>)
    {
        this.inputHeaderList = value;
    }

    /**
     * @deprecated
     *
     * @returns {Array<TerraSimpleTableRowInterface>}
     */
    public get rowList():Array<TerraSimpleTableRowInterface>
    {
        return this.inputRowList;
    }

    public set rowList(value:Array<TerraSimpleTableRowInterface>)
    {
        this.inputRowList = value;
    }

    /**
     * @deprecated
     *
     * @param rowToDelete
     */
    public deleteRow(rowToDelete:TerraSimpleTableRowInterface):void
    {
        let index = this.inputRowList.indexOf(rowToDelete);

        this.inputRowList.splice(index, 1);
    }

    private checkTooltipPlacement(placement:string):string
    {
        if(placement != null && placement != '')
        {
            return placement;
        }

        return 'top';
    }
}
