import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TerraDataTableHeaderCellInterface } from './cell/terra-data-table-header-cell.interface';
import { TerraDataTableRowInterface } from './row/terra-data-table-row.interface';
import { TerraBaseService } from '../../service/terra-base.service';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraBaseData } from '../../data/terra-base.data';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { TerraAlertComponent } from '../../alert/terra-alert.component';
import { TerraDataTableContextMenuService } from './context-menu/service/terra-data-table-context-menu.service';
import { TerraDataTableCellInterface } from './cell/terra-data-table-cell.interface';
import { isNullOrUndefined } from 'util';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';

@Component({
    selector:  'terra-data-table',
    providers: [TerraDataTableContextMenuService],
    styles:    [require('./terra-data-table.component.scss')],
    template:  require('./terra-data-table.component.html')
})
export class TerraDataTableComponent<S extends TerraBaseService, D extends TerraBaseData, I extends TerraPagerInterface> implements OnChanges
{
    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;

    @Input() inputService:S;
    @Input() inputDataType:string;
    @Input() inputHasCheckboxes:boolean;
    @Input() inputHasPager:boolean;
    @Input() inputHasInitialLoading:boolean;
    @Input() inputNoResultTextPrimary:string;
    @Input() inputNoResultTextSecondary:string;
    @Input() inputNoResultButtons:Array<TerraButtonInterface>;

    @Output() outputDoPagingEvent = new EventEmitter<TerraPagerInterface>();
    @Output() outputRowCheckBoxChanged:EventEmitter<TerraDataTableRowInterface<D>> = new EventEmitter();

    private _headerList:Array<TerraDataTableHeaderCellInterface>;
    private _rowList:Array<TerraDataTableRowInterface<D>>;
    private _selectedRowList:Array<TerraDataTableRowInterface<D>> = [];
    private _isHeaderCheckboxChecked:boolean = false;
    private _pagingData:TerraPagerInterface;
    private _pagingSize:Array<TerraSelectBoxValueInterface>;
    private _onSuccessFunction:(res) => void;
    private _defaultPagingSize:number;
    private _initialLoadingMessage:string;
    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();
    private _langPrefix:string = 'terraDataTable';
    private _requestPending:boolean;

    /**
     * @deprecated
     */
    @Input()
    private _hasCheckboxes:boolean;

    constructor()
    {
        this._hasCheckboxes = true;
        this.inputHasCheckboxes = true;
        this.inputHasInitialLoading = false;
        this.inputHasPager = true;

        this.rowList = [];
    }


    ngOnChanges(changes:SimpleChanges):void
    {
        if(changes['_hasCheckboxes'])
        {
            console.warn(
                '_hasCheckboxes is deprecated. It will be removed in one of the upcoming releases. Please use inputHasCheckboxes instead.');
            this.inputHasCheckboxes = changes['_hasCheckboxes'].currentValue;
        }
    }

    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        this._isHeaderCheckboxChecked = isChecked;

        this.rowList.forEach((row) =>
        {
            if(!row.disabled)
            {
                this.changeRowState(isChecked, row);    
            }
        });
    }

    private onRowCheckboxChange(isChecked:boolean, row:TerraDataTableRowInterface<D>):void
    {
        this.changeRowState(isChecked, row);
        this.outputRowCheckBoxChanged.emit(row);

        if(this.selectedRowList.length == 0)
        {
            this._isHeaderCheckboxChecked = false;
        }
        else if(this.selectedRowList.length > 0 && this.rowList.length == this.selectedRowList.length)
        {
            this._isHeaderCheckboxChecked = true;
        }
        else
        {
            this.viewChildHeaderCheckbox.isIndeterminate = true;
        }
    }

    private checkTooltipPlacement(placement:string):string
    {
        if(!isNullOrUndefined(placement) && placement !== '')
        {
            return placement;
        }

        return 'top';
    }

    private changeRowState(isChecked:boolean, rowToChange:TerraDataTableRowInterface<D>):void
    {
        rowToChange.selected = isChecked;

        let rowFound:boolean = false;

        this.selectedRowList.forEach((row) =>
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

    private rowClicked(cell:TerraDataTableCellInterface, row:TerraDataTableRowInterface<D>):void
    {
        if(!cell.buttonList && !row.disabled)
        {
            this._rowList.forEach((row) =>
            {
                row.isActive = false;
            });

            row.isActive = true;
            row.clickFunction();
        }
    }

    public get headerList():Array<TerraDataTableHeaderCellInterface>
    {
        return this._headerList;
    }

    public set headerList(value:Array<TerraDataTableHeaderCellInterface>)
    {
        this._headerList = value;
    }

    public get rowList():Array<TerraDataTableRowInterface<D>>
    {
        return this._rowList;
    }

    public set rowList(value:Array<TerraDataTableRowInterface<D>>)
    {
        this._rowList = value;
    }

    public deleteRow(rowToDelete:TerraDataTableRowInterface<D>):void
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

    public get selectedRowList():Array<TerraDataTableRowInterface<D>>
    {
        return this._selectedRowList;
    }

    public set pagingData(value:TerraPagerInterface)
    {
        this._pagingData = value;
    }

    public get pagingData():TerraPagerInterface
    {
        return this._pagingData;
    }

    public doPaging(pagerData:TerraPagerInterface):void
    {
        this.outputDoPagingEvent.emit(pagerData);

        this._isHeaderCheckboxChecked = false;

        if(!isNullOrUndefined(this.rowList))
        {
            this.rowList.forEach((row:TerraDataTableRowInterface<D>) =>
            {
                this.changeRowState(false, row);
            });
        }
    }

    public get pagingSize():Array<TerraSelectBoxValueInterface>
    {
        return this._pagingSize;
    }

    public set pagingSize(value:Array<TerraSelectBoxValueInterface>)
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

    public get onSuccessFunction():(res:any) => void
    {
        return this._onSuccessFunction;
    }

    public set onSuccessFunction(value:(res:any) => void)
    {
        this._onSuccessFunction = value;
    }

    public doSearch(restCall:Observable<I>):void
    {
        if(isNullOrUndefined(restCall))
        {
            return;
        }

        this._requestPending = true;
        restCall.subscribe(this.onSuccessFunction, error =>
            {
                if(error.status == 401 || error.status == 500)
                {
                    //TODO
                    alert(error.status);
                }
            },
            () =>
            {
                this._requestPending = false;
            }
        );
    }

    public getTextAlign(item:TerraDataTableHeaderCellInterface):any
    {
        if(!isNullOrUndefined(item.textAlign))
        {
            return {'text-align': item.textAlign};
        }
        else
        {
            return {'text-align': "left"};
        }
    }
}
