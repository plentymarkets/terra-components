import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {
    MatHeaderRow,
    MatTableDataSource
} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
    CdkDrag,
    DragDrop,
    DropListRef,
    moveItemInArray
} from '@angular/cdk/drag-drop';
import { DragRefInternal as DragRef } from '@angular/cdk/drag-drop/typings/drag-ref';
import { takeUntil } from 'rxjs/operators';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @description This is a sandbox app which can be used to test out functionality from the TerraComponents library.
 * By default, it displays all the examples provided by the library.
 *
 * NOTE: This app is not compiled when running `npm run build`. Hence, it will also not be published.
 */
@Component({
    selector:      'tc-sandbox-app',
    template:      require('./app.component.html'),
    styles:        [require('./app.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit
{
    protected columns:Array<string> = [
        'position',
        'name',
        'weight',
        'symbol'
    ];

    protected dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatSort)
    protected sort:MatSort;

    @ViewChild(MatHeaderRow, {read: ElementRef})
    private headerRow:MatHeaderRow;

    @ViewChildren(CdkDrag)
    private drags:QueryList<CdkDrag>;

    constructor(private dndService:DragDrop) {}

    public ngOnInit():void
    {
        this.dataSource.sort = this.sort;
    }

    protected drop(event:any):void
    {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }

    public ngAfterViewInit():void
    {
        this.createDropList();
        this.drags.changes.subscribe(() => this.createDropList())
    }

    private createDropList():void
    {
        const dropListRef:DropListRef = this.dndService.createDropList(this.headerRow as ElementRef);
        dropListRef.withItems(this.drags.toArray().map((drag:CdkDrag) => drag._dragRef));
        dropListRef.withOrientation('horizontal');
        dropListRef.dropped.pipe(takeUntil(this.drags.changes)).subscribe((event:{
            item: DragRef;
            currentIndex: number;
            previousIndex: number;
            container: DropListRef<any>;
            previousContainer: DropListRef<any>;
            isPointerOverContainer: boolean;
        }) => this.drop(event) );
    }
}
