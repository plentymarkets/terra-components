import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TerraSimpleTableHeaderCellInterface } from './cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from './row/terra-simple-table-row.interface';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';
import { Key } from 'ts-keycode-enum';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-simple-table',
    styleUrls: ['./terra-simple-table.component.scss'],
    templateUrl: './terra-simple-table.component.html'
})
/** @deprecated since v5.0. Please use mat-table instead. */
export class TerraSimpleTableComponent<D> implements OnChanges {
    @Input()
    public inputHeaderList: Array<TerraSimpleTableHeaderCellInterface>;

    @Input()
    public inputRowList: Array<TerraSimpleTableRowInterface<D>>;

    @Input()
    public inputUseHighlighting: boolean = false;

    @Input()
    public inputIsStriped: boolean = false;

    @Input()
    public inputHasCheckboxes: boolean = false;

    @Input()
    public inputEnableHotkeys: boolean = false;

    @Input()
    public inputHighlightedRow: TerraSimpleTableRowInterface<D>;

    @Output()
    public readonly outputHeaderCheckBoxChanged: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public readonly outputRowCheckBoxChanged: EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @Output()
    public readonly outputRowClicked: EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @Output()
    public readonly outputHighlightedRowChange: EventEmitter<TerraSimpleTableRowInterface<D>> = new EventEmitter();

    @Output()
    public readonly outputSelectedRowsChange: EventEmitter<Array<TerraSimpleTableRowInterface<D>>> = new EventEmitter();

    @ViewChild('viewChildHeaderCheckbox', { static: false })
    public viewChildHeaderCheckbox: TerraCheckboxComponent;

    @ViewChild('scrollContainer', { read: ElementRef, static: true })
    public scrollContainer: ElementRef;

    public onRowListChange: EventEmitter<void> = new EventEmitter();

    public get selectedRowList(): Array<TerraSimpleTableRowInterface<D>> {
        return this.inputRowList.filter((row: TerraSimpleTableRowInterface<D>) => row.selected === true);
    }

    public _headerCheckbox: { checked: boolean; isIndeterminate: boolean };

    constructor(private _elementRef: ElementRef) {
        this._headerCheckbox = {
            checked: false,
            isIndeterminate: false
        };

        this.inputRowList = [];
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputRowList')) {
            this._updateHeaderCheckboxState();

            this.onRowListChange.emit();
        }
    }

    public _onHeaderCheckboxChange(): void {
        this.outputHeaderCheckBoxChanged.emit(!this._headerCheckbox.checked);

        if (this._headerCheckbox.checked) {
            this._resetSelectedRows();
        } else {
            this._selectAllRows();
        }
    }

    public _onRowCheckboxChange(row: TerraSimpleTableRowInterface<D>): void {
        // update row selection
        row.selected = !row.selected;

        // notify component user
        this.outputRowCheckBoxChanged.emit(row);

        // notify user that selection has changed
        this._triggerOutputSelectedRowsChange();

        // update header checkbox state
        this._updateHeaderCheckboxState();
    }

    public _onCheckboxClick(event: Event): void {
        // do not emit 'outputRowClicked' when toggling checkbox
        event.stopPropagation();
    }

    public _onRowClick(row: TerraSimpleTableRowInterface<D>): void {
        if (this.inputUseHighlighting && !row.disabled) {
            this.inputHighlightedRow = row;
            this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
        }
        this.outputRowClicked.emit(row);
    }

    public _onKeydown(event: KeyboardEvent): void {
        if (this.inputEnableHotkeys && this.inputUseHighlighting && this.inputHighlightedRow) {
            if (event.which === Key.DownArrow || event.which === Key.UpArrow) {
                this._highlightSiblingRow(event.which === Key.DownArrow);
            }

            if (event.which === Key.Space && this.inputHasCheckboxes) {
                if (event.ctrlKey || event.metaKey) {
                    this._headerCheckbox.checked = !this._headerCheckbox.checked;
                } else {
                    this._onRowCheckboxChange(this.inputHighlightedRow);
                }
            }

            if (event.which === Key.Enter) {
                this.outputRowClicked.emit(this.inputHighlightedRow);
            }

            event.preventDefault();
        }
    }

    public _getTextAlign(item: TerraSimpleTableHeaderCellInterface): string {
        if (!isNullOrUndefined(item.textAlign)) {
            return item.textAlign;
        } else {
            return 'left';
        }
    }

    private _triggerOutputSelectedRowsChange(): void {
        this.outputSelectedRowsChange.emit(this.selectedRowList);
    }

    private _checkHeaderCheckbox(): void {
        this._headerCheckbox.checked = true;
        this._headerCheckbox.isIndeterminate = false;
    }

    private _uncheckHeaderCheckbox(): void {
        this._headerCheckbox.checked = false;
        this._headerCheckbox.isIndeterminate = false;
    }

    private _setHeaderCheckboxIndeterminate(): void {
        this._headerCheckbox.checked = false;
        this._headerCheckbox.isIndeterminate = true;
    }

    private _updateHeaderCheckboxState(): void {
        let selectedRowsCount: number = this.selectedRowList.length;

        if (selectedRowsCount === 0) {
            // anything selected?
            this._uncheckHeaderCheckbox();
        } else if (selectedRowsCount > 0 && this.inputRowList.length === selectedRowsCount) {
            // all selected?
            this._checkHeaderCheckbox();
        } // some rows selected -> indeterminate
        else {
            this._setHeaderCheckboxIndeterminate();
        }
    }

    private _selectAllRows(): void {
        this._checkHeaderCheckbox();

        this.inputRowList.forEach((row: TerraSimpleTableRowInterface<D>) => {
            if (!row.disabled) {
                row.selected = true;
            }
        });

        // notify user that selection has changed
        this._triggerOutputSelectedRowsChange();
    }

    private _resetSelectedRows(): void {
        this._uncheckHeaderCheckbox();

        this.inputRowList.forEach((row: TerraSimpleTableRowInterface<D>) => {
            row.selected = false;
        });

        // notify user that selection has been reset
        this._triggerOutputSelectedRowsChange();
    }

    private _highlightSiblingRow(nextSibling: boolean): void {
        if (this.inputHighlightedRow) {
            let i: number = nextSibling ? 1 : -1;
            let highlightIndex: number = this.inputRowList.indexOf(this.inputHighlightedRow) + i;

            while (highlightIndex >= 0 && highlightIndex < this.inputRowList.length) {
                if (!this.inputRowList[highlightIndex].disabled) {
                    this.inputHighlightedRow = this.inputRowList[highlightIndex];
                    this.outputHighlightedRowChange.emit(this.inputHighlightedRow);
                    break;
                }
                highlightIndex += i;
            }

            if (highlightIndex >= 0 && highlightIndex < this.inputRowList.length) {
                let activeRow: HTMLElement = this._elementRef.nativeElement.querySelector(
                    'table tbody tr:nth-child(' + (highlightIndex + 1) + ')'
                );
                let viewport: ClientRect = this.scrollContainer.nativeElement.getBoundingClientRect();
                let activeRowPosition: ClientRect = activeRow.getBoundingClientRect();

                if (viewport.bottom < activeRowPosition.bottom) {
                    this.scrollContainer.nativeElement.scrollTop += activeRowPosition.bottom - viewport.bottom;
                } else if (viewport.top > activeRowPosition.top) {
                    this.scrollContainer.nativeElement.scrollTop -= viewport.top - activeRowPosition.top;
                }
            }
        }
    }
}
