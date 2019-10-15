import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
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
export class ColumnConfigComponent
{
    /**
     * Emits whenever the visibility or index is changed.
     */
    @Output()
    public displayedColumnsChange:EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

    /**
     * Columns with all informations.
     */
    @Input()
    public columns:Array<ColumnConfigInterface>;

    /**
     * Keys of displaying columns. Same as needed for mat-table
     */
    @Input()
    public displayedColumns:Array<string>;

    protected columnMenuDropped(event:CdkDragDrop<any>):void
    {
        moveItemInArray(this.columns, event.item.data.columnIndex, event.currentIndex);

        this.fireChangeEvent();
    }

    protected toggleSelectedColumn(columnId:string):void
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
