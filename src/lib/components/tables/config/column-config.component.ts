import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray
} from '@angular/cdk/drag-drop';
import { ColumnConfigInterface } from './data/column-config.interface';

@Component({
    selector:        'tc-column-config',
    template:        require('./column-config.component.html'),
    styles:          [require('./column-config.component.scss')],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnConfigComponent implements OnInit, AfterViewInit
{
    @Output()
    public displayedColumnsChange:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

    @Input()
    public columns:Array<ColumnConfigInterface>;

    @Input()
    public displayedColumns:Array<string>;

    constructor(private elementRef:ElementRef)
    {
    }

    public ngOnInit():void
    {
    }

    public ngAfterViewInit():void
    {
        this.elementRef.nativeElement.classList += 'va-mat-button-no-input';
    }

    public columnMenuDropped(event:CdkDragDrop<any>):void
    {
        moveItemInArray(this.columns, event.item.data.columnIndex, event.currentIndex);

        this.fireChangeEvent();
    }

    public toggleSelectedColumn(columnId:string):void
    {
        const colFound:ColumnConfigInterface = this.columns.find((col:ColumnConfigInterface) => col.key === columnId);
        colFound.hidden = !colFound.hidden;

        this.fireChangeEvent();
    }

    private fireChangeEvent():void
    {
        this.displayedColumnsChange.emit(this.columns.filter((colInfo:ColumnConfigInterface) => !colInfo.hidden)
                                             .map((colInfo:ColumnConfigInterface) => colInfo.key));
    }
}
