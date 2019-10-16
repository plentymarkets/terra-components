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
     * Emits whenever the visibility or sorting is changed.
     */
    public columnsChanged:EventEmitter<Array<ColumnConfigInterface>> = new EventEmitter<Array<ColumnConfigInterface>>();

    /**
     * Columns with all informations.
     */
    public columns:Array<ColumnConfigInterface>;

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
        this.columnsChanged.emit(this.columns.filter((colInfo:ColumnConfigInterface) => !colInfo.hidden));
    }
}
