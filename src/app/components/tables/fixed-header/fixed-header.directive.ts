import {
    AfterViewChecked,
    AfterViewInit,
    Directive,
    ElementRef,
    forwardRef,
    Inject
} from '@angular/core';
import { TerraSimpleTableComponent } from '../../tables/simple/terra-simple-table.component';

const FIXED_CLASS:string = 'fixedHeader';

@Directive({
    selector: 'terra-simple-table[fixedHeader]'
})
export class FixedHeaderDirective implements AfterViewInit, AfterViewChecked
{
    private tableElement:HTMLTableElement;
    private tableHeadElement:HTMLTableSectionElement;
    private tableBodyElement:HTMLTableSectionElement;
    private columnWidths:Array<number> = [];

    constructor(private elementRef:ElementRef,
                @Inject(forwardRef(() => TerraSimpleTableComponent)) private tableComponent:any)
    {
    }

    public ngAfterViewInit():void
    {
        this.tableElement = this.elementRef.nativeElement.querySelector('table');
        this.tableHeadElement = this.tableElement.querySelector('thead');
        this.tableBodyElement = this.tableElement.querySelector('tbody');
    }

    public ngAfterViewChecked():void
    {
        // check if table has at least one row
        if(this.tableElement && this.tableBodyElement.querySelector('tr:first-child'))
        {
            this.updateColumnWidths();
        }
    }

    private updateColumnWidths():void
    {

        let rows:NodeListOf<HTMLElement> = this.tableBodyElement.querySelectorAll('tr');
        let headerCol:HTMLElement;
        let bodyCol:HTMLElement;

        // adjust difference between header width and body width
        let headerWidth:number = this.tableHeadElement.getBoundingClientRect().width;
        let bodyWidth:number = this.tableBodyElement.getBoundingClientRect().width;
        this.tableHeadElement.style.paddingRight = (headerWidth - bodyWidth) + 'px';

        // assign column widths
        this.getColumnWidths()
            .forEach((width:number, index:number) =>
            {
                headerCol = <HTMLElement> this.tableHeadElement.querySelector('tr th:nth-child(' + (index + 1) + ')');
                if(headerCol)
                {
                    headerCol.style.width = width + '%';
                }

                for(let i:number = 0; i < rows.length; i++)
                {
                    bodyCol = <HTMLElement> rows.item(i).querySelector('tr td:nth-child(' + (index + 1) + ')');
                    if(bodyCol)
                    {
                        bodyCol.style.width = width + '%';
                    }
                }

            });
    }

    private getColumnWidths():Array<number>
    {
        let firstRow:HTMLElement = <HTMLElement> this.tableBodyElement.querySelector('tr:first-child');
        if(firstRow)
        {
            let rowWidth:number = firstRow.getBoundingClientRect().width;
            let columns:NodeListOf<HTMLElement> = firstRow.querySelectorAll('td');
            if(rowWidth > 0 && columns.length !== this.columnWidths.length)
            {
                this.columnWidths = [];
                for(let i:number = 0; i < columns.length; i++)
                {
                    this.columnWidths.push(
                        (columns.item(i).getBoundingClientRect().width / rowWidth) * 100
                    );
                }
            }
        }

        return this.columnWidths;
    }
}
