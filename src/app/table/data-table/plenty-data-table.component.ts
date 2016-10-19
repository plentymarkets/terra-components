import {
    Component,
    Input,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlentyTableHeaderCell } from '../cell/plenty-table-header-cell';
import { PlentyTableRow } from '../row/plenty-table-row';
import { BaseService } from '../../service/base.service';
import { PlentyPagerData } from '../../pager/data/plenty-pager-data';
import { BaseData } from '../../data/base-data';
import { PlentyCheckbox } from '../../forms/checkbox/plenty-checkbox.component';
import { PlentySelectBoxValue } from '../../forms/select-box/value/plenty-select-box-value';
import { PlentyAlert } from '../../alert/plenty-alert.component';
import { PlentyOverlay } from '../../overlay/plenty-overlay.component';
import { PlentyDataTableContextMenuService } from './context-menu/service/plenty-data-table-context-menu.service';

@Component({
               selector:  'plenty-data-table',
               providers: [PlentyDataTableContextMenuService],
               styles:    [require('./plenty-data-table.component.scss')],
               template:  require('./plenty-data-table.component.html')
           })

export class PlentyDataTable<S extends BaseService, D extends BaseData>
{
    @Input() service:S;
    @Output() doPagingEvent = new EventEmitter<PlentyPagerData>();
    @ViewChild('headerCheckbox') headerCheckbox:PlentyCheckbox;
    private _headerList:Array<PlentyTableHeaderCell>;
    private _rowList:Array<PlentyTableRow<D>>;
    private _selectedRowList:Array<PlentyTableRow<D>> = [];
    private isHeaderCheckboxChecked:boolean = false;
    private _pagingData:PlentyPagerData;
    private _pagingSize:Array<PlentySelectBoxValue>;
    private _defaultPagingSize:number;
    private _onSuccessFunction:(res)=>void;

    // Overlay
    @ViewChild('overlayDataTableSettings') overlayDataTableSettings:PlentyOverlay;
    private _rowListOverlay:Array<PlentyTableRow<D>>;
    private selectedRowListOverlay:Array<PlentyTableRow<D>> = [];
    private saveButtonTooltip:string = 'Speichern';
    private cancelButtonTooltip:string = 'Abbrechen';

    private alert:PlentyAlert = PlentyAlert.getInstance();

    constructor()
    {
    }

    private openOverlayDataTableSettings():void
    {
        this.overlayDataTableSettings.showOverlay();
    }

    private primaryClicked(overlay:PlentyOverlay):void
    {
        this.rowListOverlay.forEach(
            (row) => row.cellList.forEach(
                (cell) =>
                {
                    this.changeColumnVisibility(cell.identifier, row.selected);
                }
            )
        )

        overlay.hideOverlay();
    }

    private secondaryClicked(overlay:PlentyOverlay):void
    {
        overlay.hideOverlay();
    }

    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        this.isHeaderCheckboxChecked = isChecked;

        this.rowList.forEach(
            (row)=>
            {
                this.changeRowState(isChecked, row);
            });
    }

    private onCheckboxChangeOverlay(isChecked:boolean,
                                    row:PlentyTableRow<D>):void
    {
        this.changeCheckboxStateOverlay(isChecked, row);
    }

    private onRowCheckboxChange(isChecked:boolean,
                                row:PlentyTableRow<D>):void
    {
        this.changeRowState(isChecked, row);

        if(this.selectedRowList.length == 0)
        {
            this.isHeaderCheckboxChecked = false;
        }
        else if(this.selectedRowList.length > 0 && this.rowList.length == this.selectedRowList.length)
        {
            this.isHeaderCheckboxChecked = true;
        }
        else
        {
            this.headerCheckbox.isIndeterminate = true;
        }
    }

    public changeCheckboxStateOverlay(isChecked:boolean,
                                      rowToChange:PlentyTableRow<D>):void
    {
        rowToChange.selected = isChecked;

        let rowFound:boolean = false;

        this.selectedRowListOverlay.forEach(
            (row)=>
            {
                if(row == rowToChange)
                {
                    rowFound = true;
                }
            });

        if(rowToChange.selected)
        {
            if(!rowFound)
            {
                this.selectedRowListOverlay.push(rowToChange);
            }
        }
        else
        {
            let index = this.selectedRowListOverlay.indexOf(rowToChange);

            this.selectedRowListOverlay.splice(index, 1);
        }
    }

    private changeRowState(isChecked:boolean,
                           rowToChange:PlentyTableRow<D>):void
    {
        rowToChange.selected = isChecked;

        let rowFound:boolean = false;

        this.selectedRowList.forEach(
            (row)=>
            {
                if(row == rowToChange)
                {
                    rowFound = true;
                }
            });

        if(rowToChange.selected)
        {
            if(!rowFound)
            {
                this.selectedRowList.push(rowToChange);
            }
        }
        else
        {
            let index = this.selectedRowList.indexOf(rowToChange);

            this.selectedRowList.splice(index, 1);
        }
    }

    public get headerList():Array<PlentyTableHeaderCell>
    {
        return this._headerList;
    }

    public set headerList(value:Array<PlentyTableHeaderCell>)
    {
        this._headerList = value;
    }

    public get rowListOverlay():Array<PlentyTableRow<D>>
    {
        return this._rowListOverlay;
    }

    public get rowList():Array<PlentyTableRow<D>>
    {
        return this._rowList;
    }

    public set rowListOverlay(value:Array<PlentyTableRow<D>>)
    {
        this._rowListOverlay = value;
    }

    public set rowList(value:Array<PlentyTableRow<D>>)
    {
        this._rowList = value;

        this.rowList.forEach(
            row =>row.contextMenuLinkList.forEach(
                l => l.subject.subscribe(
                    val=> val.clickFunction(val)))
        );
    }

    public deleteRow(rowToDelete:PlentyTableRow<D>):void
    {
        let index = this.rowList.indexOf(rowToDelete);

        this.rowList.splice(index, 1);

        let selectedIndex = this.selectedRowList.indexOf(rowToDelete);

        // check if row exists in selectedRowList
        if(selectedIndex != null)
        {
            this.selectedRowList.splice(selectedIndex, 1);
        }
    }

    public get selectedRowList():Array<PlentyTableRow<D>>
    {
        return this._selectedRowList;
    }

    public set pagingData(value:PlentyPagerData)
    {
        this._pagingData = value;
    }

    public get pagingData():PlentyPagerData
    {
        return this._pagingData;
    }

    public doPaging(pagerData:PlentyPagerData):void
    {
        this.doPagingEvent.emit(pagerData);

        this.isHeaderCheckboxChecked = false;
        this.rowList.forEach(
            (row)=>
            {
                this.changeRowState(false, row);
            });
    }

    public get pagingSize():Array<PlentySelectBoxValue>
    {
        return this._pagingSize;
    }

    public set pagingSize(value:Array<PlentySelectBoxValue>)
    {
        this._pagingSize = value;
    }

    public get defaultPagingSize():number
    {
        return this._defaultPagingSize;
    }

    public set defaultPagingSize(value:number)
    {
        this._defaultPagingSize = value;
    }

    public get onSuccessFunction():(res:any)=>void
    {
        return this._onSuccessFunction;
    }

    public set onSuccessFunction(value:(res:any)=>void)
    {
        this._onSuccessFunction = value;
    }

    public doSearch(restCall:Observable<D>):void
    {
        //TODO check
        restCall.subscribe(
            this.onSuccessFunction,
            error =>
            {
                if(error.status == 401 ||
                   error.status == 500)
                {
                    //TODO
                    alert(error.status);
                }
            }
        )
    }

    private changeColumnVisibility(id:string,
                                   isChecked:boolean):void
    {
        let hide:boolean;

        if(isChecked)
        {
            hide = false;
        }
        else
        {
            hide = true;
        }
        this._headerList.forEach(
            (cell)=>
            {
                if(cell.identifier == id)
                {
                    cell.isHidden = hide;
                }
            }
        )

        this.rowList.forEach(
            (row)=>
            {
                this.changeCellVisibility(row, id, hide);
            });
    }

    private changeCellVisibility(rowToChange:PlentyTableRow<D>,
                                 id:string,
                                 hide:boolean):void
    {
        rowToChange.cellList.forEach(
            (i) =>
            {
                if(i.identifier == id)
                {
                    i.isHidden = hide;
                }
            });
    }

    public showAllColumns():void
    {
        this._headerList.forEach(
            (cell)=>
            {
                if(cell.isHidden == true)
                {
                    cell.isHidden = false;
                }
            });

        this.rowList.forEach(
            (row)=>
            {
                row.cellList.forEach(
                    (i) =>
                    {
                        if(i.isHidden == true)
                        {
                            i.isHidden = false;
                        }
                    })
            });

        this.rowListOverlay.forEach(
            (row) =>
            {
                row.selected = true;
            }
        )
    }
}
