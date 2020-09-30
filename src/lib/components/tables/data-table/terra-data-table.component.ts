import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { TerraDataTableContextMenuService } from './context-menu/terra-data-table-context-menu.service';
import { TerraDataTableBaseService } from './terra-data-table-base.service';
import { TerraDataTableHeaderCellInterface } from './interfaces/terra-data-table-header-cell.interface';
import { TerraDataTableRowInterface } from './interfaces/terra-data-table-row.interface';
import { TerraDataTableSortOrderEnum } from './enums/terra-data-table-sort-order.enum';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraHrefTypeInterface } from './interfaces/terra-href-type.interface';
import { isArray, isNullOrUndefined } from 'util';
import { TerraTextAlignEnum } from './enums/terra-text-align.enum';
import { TerraHrefTypeEnum } from './enums/terra-href-type.enum';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { TerraBaseTable } from '../terra-base-table';
import { TerraDataTableTextInterface } from './interfaces/terra-data-table-text.interface';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';
import { TerraDataTableContextMenuEntryInterface } from './context-menu/data/terra-data-table-context-menu-entry.interface';

@Component({
    selector: 'terra-data-table',
    templateUrl: './terra-data-table.component.html',
    styleUrls: ['./terra-data-table.component.scss'],
    providers: [TerraDataTableContextMenuService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerraDataTableComponent<T, P> extends TerraBaseTable<T> implements OnInit, OnChanges {
    /**
     * @description Mandatory service that is used to request the table data from the server
     */
    @Input()
    public inputService: TerraDataTableBaseService<T, P>;
    /**
     * @description List of header cell elements
     */
    @Input()
    public inputHeaderList: Array<TerraDataTableHeaderCellInterface> = [];

    /**
     * @description shows checkboxes in the table, to be able to select any row
     * @default true
     */
    @Input()
    public inputHasCheckboxes: boolean = true;
    /**
     * @description show/hides the pager above the table
     * @default true
     */
    @Input()
    public inputHasPager: boolean = true;
    /**
     * @description differentiates whether auto rendering of rows/cells or content projection is used
     */
    @Input()
    public useContentBody: boolean = false;

    /**
     * @description context menu for rows
     */
    @Input()
    public inputContextMenu: Array<TerraDataTableContextMenuEntryInterface<T>> = [];

    public _columnHeaderClicked: EventEmitter<TerraDataTableHeaderCellInterface> = new EventEmitter<
        TerraDataTableHeaderCellInterface
    >();

    public readonly _refType: typeof TerraHrefTypeEnum = TerraHrefTypeEnum;
    public readonly _checkboxColumnWidth: number = 25;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    public get _rowList(): Array<TerraDataTableRowInterface<T>> {
        return !isNullOrUndefined(this.inputService) ? this.inputService.rowList : [];
    }

    /**
     * @description Initialization routine. It sets up the pager.
     */
    public ngOnInit(): void {
        if (isNullOrUndefined(this.inputService)) {
            console.error(`No 'inputService' given. This service is mandatory to display data in the table`);
            return;
        }

        this._columnHeaderClicked
            .pipe(
                filter((header: TerraDataTableHeaderCellInterface) => {
                    // change sorting column and order only if no request is pending and sortBy attribute is given
                    return !this.inputService.requestPending && !isNullOrUndefined(header.sortBy);
                }),
                tap((header: TerraDataTableHeaderCellInterface) => this._changeSortingColumn(header)),
                debounceTime(400)
            )
            .subscribe(() => this._getResults());

        this.inputService.cdr = this._cdr;
    }

    /**
     * @description Change detection routine. It resets the sorting configuration if the header list is updated.
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['inputHeaderList']) {
            if (!isNullOrUndefined(this.inputService)) {
                this.inputService.resetSortParams();
            }
        }
    }

    public get _dataAvailableOrRequestPending(): boolean {
        return this.isTableDataAvailable || (!isNullOrUndefined(this.inputService) && this.inputService.requestPending);
    }

    private get isTableDataAvailable(): boolean {
        return this._rowList && this._rowList.length > 0;
    }

    public _doPaging(): void {
        // request data from server
        this._getResults();

        // reset row selections
        this._resetSelectedRows();
    }

    public _getCellDataType(data: unknown): string {
        function isRefType(arg: unknown): arg is TerraHrefTypeInterface {
            const typeCheck: TerraHrefTypeInterface = arg as TerraHrefTypeInterface;
            return (
                !isNullOrUndefined(typeCheck) &&
                !isNullOrUndefined(typeCheck.type) &&
                typeof typeCheck.type === 'string' &&
                !isNullOrUndefined(typeCheck.value) &&
                (typeof typeCheck.value === 'string' ||
                    typeof typeCheck.value === 'number' ||
                    typeof typeCheck.value === 'function')
            );
        }

        function isTextType(arg: unknown): arg is TerraDataTableTextInterface {
            const typeCheck: TerraDataTableTextInterface = arg as TerraDataTableTextInterface;
            return (
                !isNullOrUndefined(arg) &&
                !isNullOrUndefined(typeCheck.caption) &&
                typeof typeCheck.caption === 'string'
            );
        }

        function isTagArray(arg: unknown): arg is Array<TerraTagInterface> {
            const typeCheck: Array<TerraTagInterface> = arg as Array<TerraTagInterface>;
            // check if it is an array
            if (!isArray(typeCheck)) {
                return false;
            }

            // check if every element of the array implements the tag interface
            let implementsInterface: boolean = typeCheck.every((elem: TerraTagInterface) => {
                return !isNullOrUndefined(elem.name) && typeof elem.name === 'string';
            });

            return !isNullOrUndefined(arg) && implementsInterface;
        }

        function isButtonArray(arg: unknown): arg is Array<TerraButtonInterface> {
            const typeCheck: Array<TerraButtonInterface> = arg as Array<TerraButtonInterface>;
            // check if it is an array
            if (!isArray(typeCheck)) {
                return false;
            }

            // check if every element of the array implements the button interface
            let implementsInterface: boolean = typeCheck.every((elem: TerraButtonInterface) => {
                return !isNullOrUndefined(elem.clickFunction) && typeof elem.clickFunction === 'function';
            });

            return !isNullOrUndefined(arg) && implementsInterface;
        }

        if (typeof data === 'object') {
            if (isRefType(data)) {
                return 'TerraRefTypeInterface';
            } else if (isTextType(data)) {
                return 'TerraDataTableTextInterface';
            } else if (isTagArray(data)) {
                return 'tags';
            } else if (isButtonArray(data)) {
                return 'buttons';
            }
        }
        return typeof data;
    }

    public getTextAlign(item: TerraDataTableHeaderCellInterface): TerraTextAlignEnum {
        // TODO: Pipe?
        if (!isNullOrUndefined(item) && !isNullOrUndefined(item.textAlign)) {
            return item.textAlign;
        } else {
            return TerraTextAlignEnum.LEFT;
        }
    }

    public _isSortable(header: TerraDataTableHeaderCellInterface): boolean {
        if (isNullOrUndefined(header)) {
            return false;
        }
        return !isNullOrUndefined(header.sortBy);
    }

    public _isUnsorted(header: TerraDataTableHeaderCellInterface): boolean {
        return this._isSortable(header) && header.sortBy !== this.inputService.sortBy;
    }

    public _isSortedAsc(header: TerraDataTableHeaderCellInterface): boolean {
        return this._isSorted(header, TerraDataTableSortOrderEnum.ascending);
    }

    public _isSortedDesc(header: TerraDataTableHeaderCellInterface): boolean {
        return this._isSorted(header, TerraDataTableSortOrderEnum.descending);
    }

    private _changeSortingColumn(header: TerraDataTableHeaderCellInterface): void {
        if (isNullOrUndefined(this.inputService)) {
            return;
        }

        // clicked on the same column?
        if (this.inputService.sortBy === header.sortBy) {
            // only change sorting order
            this._toggleSortingOrder();
        } else {
            this.inputService.sortBy = header.sortBy;
            this.inputService.sortOrder = TerraDataTableSortOrderEnum.descending; // default is descending
        }
    }

    private _toggleSortingOrder(): void {
        this.inputService.sortOrder =
            this.inputService.sortOrder === TerraDataTableSortOrderEnum.descending
                ? TerraDataTableSortOrderEnum.ascending
                : TerraDataTableSortOrderEnum.descending;
    }

    private _getResults(): void {
        if (!isNullOrUndefined(this.inputService)) {
            this.inputService.getResults();
        }
    }

    private _isSorted(header: TerraDataTableHeaderCellInterface, sortOrder: TerraDataTableSortOrderEnum): boolean {
        return (
            this._isSortable(header) &&
            header.sortBy === this.inputService.sortBy &&
            this.inputService.sortOrder === sortOrder
        );
    }
}
