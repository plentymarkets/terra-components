import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  Inject
} from '@angular/core';
import { TerraSimpleTableComponent } from '../simple/terra-simple-table.component';

const FIXED_CLASS: string = 'fixedHeader';

/**
 * @deprecated since v4.
 */
@Directive({
  selector: 'terra-simple-table[fixedHeader]'
})
export class FixedHeaderDirective implements AfterViewInit, AfterViewChecked {
  private _tableElement: HTMLTableElement;
  private _tableHeadElement: HTMLTableSectionElement;
  private _tableBodyElement: HTMLTableSectionElement;
  private _columnWidths: Array<number> = [];

  constructor(
    private _elementRef: ElementRef,
    @Inject(forwardRef(() => TerraSimpleTableComponent)) private _tableComponent: any
  ) {}

  public ngAfterViewInit(): void {
    this._tableElement = this._elementRef.nativeElement.querySelector('table');
    this._tableHeadElement = this._tableElement.querySelector('thead');
    this._tableBodyElement = this._tableElement.querySelector('tbody');
  }

  public ngAfterViewChecked(): void {
    // check if table has at least one row
    if (this._tableElement && this._tableBodyElement.querySelector('tr:first-child')) {
      this._updateColumnWidths();
    }
  }

  private _updateColumnWidths(): void {
    let rows: NodeListOf<HTMLElement> = this._tableBodyElement.querySelectorAll('tr');
    let headerCol: HTMLElement;
    let bodyCol: HTMLElement;

    // adjust difference between header width and body width
    let headerWidth: number = this._tableHeadElement.getBoundingClientRect().width;
    let bodyWidth: number = this._tableBodyElement.getBoundingClientRect().width;
    this._tableHeadElement.style.paddingRight = headerWidth - bodyWidth + 'px';

    // assign column widths
    this._getColumnWidths().forEach((width: number, index: number) => {
      headerCol = <HTMLElement>(
        this._tableHeadElement.querySelector('tr th:nth-child(' + (index + 1) + ')')
      );
      if (headerCol) {
        headerCol.style.width = width + '%';
      }

      for (let i: number = 0; i < rows.length; i++) {
        bodyCol = <HTMLElement>rows.item(i).querySelector('tr td:nth-child(' + (index + 1) + ')');
        if (bodyCol) {
          bodyCol.style.width = width + '%';
        }
      }
    });
  }

  private _getColumnWidths(): Array<number> {
    let firstRow: HTMLElement = <HTMLElement>this._tableBodyElement.querySelector('tr:first-child');
    if (firstRow) {
      let rowWidth: number = firstRow.getBoundingClientRect().width;
      let columns: NodeListOf<HTMLElement> = firstRow.querySelectorAll('td');
      if (rowWidth > 0 && columns.length !== this._columnWidths.length) {
        this._columnWidths = [];
        for (let i: number = 0; i < columns.length; i++) {
          this._columnWidths.push((columns.item(i).getBoundingClientRect().width / rowWidth) * 100);
        }
      }
    }

    return this._columnWidths;
  }
}
