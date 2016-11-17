import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TerraOverlayComponent } from './overlay/terra-overlay.component';
import { TerraSimpleTableComponent } from './table/simple/terra-simple-table.component';
import { TerraSimpleTableHeaderCellInterface } from './table/simple/cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from './table/simple/row/terra-simple-table-row.interface';
import { TerraSimpleTableCellInterface } from './table/simple/cell/terra-simple-table-cell.interface';
import { TerraButtonInterface } from './button/data/terra-button.interface';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss').toString()],
           })
export class TerraComponentsComponent implements OnInit
{
    @ViewChild('viewChildOverlayStatic') viewChildOverlayStatic:TerraOverlayComponent;
    @ViewChild('table') table:TerraSimpleTableComponent;
    
    private _viewContainerRef:ViewContainerRef;
    
    public constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }
    
    ngOnInit()
    {
        let headerList:Array<TerraSimpleTableHeaderCellInterface> = [];
        
        for(let x = 0; x < 5; x++)
        {
            let cell:TerraSimpleTableHeaderCellInterface = {
                caption: "header " + x,
                width:   100,
            };
            
            headerList.push(cell);
        }
        
        headerList.push({
                            caption: "buttons",
                            width:   100
                        });
        
        this.table.headerList = headerList;
        
        let rowList:Array<TerraSimpleTableRowInterface> = [];
        
        for(let i = 0; i < 10; i++)
        {
            let cellList:Array<TerraSimpleTableCellInterface> = [];
            
            for(let j = 0; j < 5; j++)
            {
                let cell:TerraSimpleTableCellInterface = {
                    caption: "row" + i + "testcell " + j
                };
                
                cellList.push(cell);
            }
            
            let buttonList:Array<TerraButtonInterface> = [];
            
            buttonList.push({
                                caption:       "hallo",
                                clickFunction: ()=>
                                               {
                                                   alert("test")
                                               }
                            });
            
            let buttonCell:TerraSimpleTableCellInterface = {
                buttonList: buttonList
            };
            
            cellList.push(buttonCell);
            
            let row:TerraSimpleTableRowInterface = {
                cellList: cellList
            };
            
            rowList.push(row);
        }
        
        this.table.rowList = rowList;
    }
    
    private openOverlayStatic():void
    {
        this.viewChildOverlayStatic.showOverlay();
    }
}
