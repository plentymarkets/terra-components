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
import { TerraDataTableContextMenuService } from './context-menu/service/terra-data-table-context-menu.service';
import { TerraDataTableCellInterface } from './cell/terra-data-table-cell.interface';
import {
    isArray,
    isNull,
    isNullOrUndefined
} from 'util';
import {
    TerraRefTypeEnum,
    TerraRefTypeInterface
} from './cell/terra-ref-type.interface';
import { TerraDataTableTextInterface } from './cell/terra-data-table-text.interface';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { TerraBaseService } from '../../../service/terra-base.service';
import { TerraBaseData } from '../../data/terra-base.data';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';
import { TerraAlertComponent } from '../../alert/terra-alert.component';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';

@Component({
    selector:   'terra-data-table',
    template:   require('./terra-data-table.component.html'),
    styles:     [require('./terra-data-table.component.scss')],
    providers:  [TerraDataTableContextMenuService],
    animations: [
        trigger('collapsedState', [
            state('hidden', style({
                height:          '0',
                overflow:        'hidden',
                'margin-bottom': '0'
            })),
            state('collapsed', style({
                height:          '*',
                overflow:        'initial',
                'margin-bottom': '6px'
            })),
            transition('hidden <=> collapsed', [
                animate(300)

            ])
        ])
    ]
})
export class TerraDataTableComponent<S extends TerraBaseService, D extends TerraBaseData, I extends TerraPagerInterface> implements OnChanges
{
    @ViewChild('viewChildHeaderCheckbox')
    public viewChildHeaderCheckbox:TerraCheckboxComponent;

    @Input()
    public inputService:S;

    @Input()
    public inputDataType:string;

    @Input()
    public inputHasCheckboxes:boolean;

    @Input()
    public inputHasPager:boolean;

    @Input()
    public inputHasInitialLoading:boolean;

    @Input()
    public inputNoResultTextPrimary:string;

    @Input()
    public inputNoResultTextSecondary:string;

    @Input()
    public inputNoResultButtons:Array<TerraButtonInterface>;

    @Input()
    public inputShowGroupFunctions:boolean = false;

    @Input()
    public inputGroupFunctionExecuteButtonIsDisabled:boolean = true;

    @Output()
    public outputDoPagingEvent:EventEmitter<TerraPagerInterface> = new EventEmitter<TerraPagerInterface>();

    @Output()
    public outputRowCheckBoxChanged:EventEmitter<TerraDataTableRowInterface<D>> = new EventEmitter();

    @Output()
    public outputGroupFunctionExecuteButtonClicked:EventEmitter<Array<TerraDataTableRowInterface<D>>> = new EventEmitter();

    public headerList:Array<TerraDataTableHeaderCellInterface>;
    public rowList:Array<TerraDataTableRowInterface<D>>;
    public pagingData:TerraPagerInterface;
    public pagingSize:Array<TerraSelectBoxValueInterface>;
    public onSuccessFunction:(res:I) => void;
    public defaultPagingSize:number;
    public TerraRefTypeEnum:object = TerraRefTypeEnum;
    private _selectedRowList:Array<TerraDataTableRowInterface<D>> = [];
    private _isHeaderCheckboxChecked:boolean = false;
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

    private get getCollapsedState():string
    {
        if(this.inputShowGroupFunctions)
        {
            return 'collapsed';
        }
        else
        {
            return 'hidden';
        }
    }

    public ngOnChanges(changes:SimpleChanges):void
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

        this.rowList.forEach((row:TerraDataTableRowInterface<D>) =>
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

        if(this.selectedRowList.length === 0)
        {
            this._isHeaderCheckboxChecked = false;
        }
        else if(this.selectedRowList.length > 0 && this.rowList.length === this.selectedRowList.length)
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

        this.selectedRowList.forEach((row:TerraDataTableRowInterface<D>):void =>
        {
            if(row === rowToChange)
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
            let index:number = this.selectedRowList.indexOf(rowToChange);

            this.selectedRowList.splice(index, 1);
        }
    }

    private rowClicked(cell:TerraDataTableCellInterface, clickedRow:TerraDataTableRowInterface<D>):void
    {
        if(!cell.buttonList && !clickedRow.disabled)
        {
            this.rowList.forEach((row:TerraDataTableRowInterface<D>):void =>
            {
                row.isActive = false;
            });

            clickedRow.isActive = true;
            clickedRow.clickFunction();
        }
    }

    public deleteRow(rowToDelete:TerraDataTableRowInterface<D>):void
    {
        let index:number = this.rowList.indexOf(rowToDelete);

        this.rowList.splice(index, 1);

        let selectedIndex:number = this.selectedRowList.indexOf(rowToDelete);

        // check if row exists in selectedRowList
        if(!isNull(selectedIndex))
        {
            this.selectedRowList.splice(selectedIndex, 1);
        }
    }

    public get selectedRowList():Array<TerraDataTableRowInterface<D>>
    {
        return this._selectedRowList;
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

    public doSearch(restCall:Observable<I>):void
    {
        if(isNullOrUndefined(restCall))
        {
            return;
        }

        this._requestPending = true;
        restCall.subscribe(
            (res:I) =>
            {
                this._selectedRowList = [];
                this.onSuccessFunction(res);
            },
            (error:any) =>
            {
                if(error.status === 401 || error.status === 500)
                {
                    // TODO
                    // alert(error.status);
                }
            },
            () =>
            {
                this._requestPending = false;
            }
        );
    }

    public getTextAlign(item:TerraDataTableHeaderCellInterface):string
    {
        if(!isNullOrUndefined(item.textAlign))
        {
            return item.textAlign;
        }
        else
        {
            return 'left';
        }
    }

    private getCellDataType(data:any):string
    {
        function isRefType(arg:any):arg is TerraRefTypeInterface
        {
            return arg
                   && arg.type && typeof arg.type === 'string'
                   && arg.value && typeof arg.value === 'string';
        }

        function isTextType(arg:any):arg is TerraDataTableTextInterface
        {
            return arg && arg.caption && typeof arg.caption === 'string';
        }

        function isTagArray(arg:any):arg is Array<TerraTagInterface>
        {
            // check if it is an array
            if(!isArray(arg))
            {
                return false;
            }

            // check if every element of the array implements the tag interface
            let implementsInterface:boolean = true;
            arg.forEach((elem:any) =>
            {
                implementsInterface = implementsInterface && elem.badge && typeof elem.badge === 'string';
            });

            return arg && implementsInterface;
        }

        function isButtonArray(arg:any):arg is Array<TerraButtonInterface>
        {
            // check if it is an array
            if(!isArray(arg))
            {
                return false;
            }

            // check if every element of the array implements the button interface
            let implementsInterface:boolean = true;
            arg.forEach((elem:any) =>
            {
                implementsInterface = implementsInterface && elem.clickFunction && typeof elem.clickFunction === 'function';
            });

            return arg && implementsInterface;
        }

        if(typeof data === 'object')
        {
            if(isRefType(data))
            {
                return 'TerraRefTypeInterface';
            }
            else if(isTextType(data))
            {
                return 'TerraDataTableTextInterface';
            }
            else if(isTagArray(data))
            {
                return 'tags';
            }
            else if(isButtonArray(data))
            {
                return 'buttons';
            }
        }
        return typeof data;
    }

    private onGroupFunctionExecuteButtonClicked(event:Event):void
    {
        this.outputGroupFunctionExecuteButtonClicked.emit(this._selectedRowList);
    }
}
