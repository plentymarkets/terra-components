import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

/**
 * @author mkunze
 * @description This component replaces <terra-filter>
 */
@Component({
    selector: 'tc-filter',
    template: require('./filter.component.html')
})
export class FilterComponent
{
    /**
     * @description Set the function which will be executed on click of the search button.
     */
    @Output()
    public search:EventEmitter<void> = new EventEmitter<void>();

    /**
     * @description Set the function which will be executed on click of the reset button.
     */
    @Output()
    public reset:EventEmitter<void> = new EventEmitter<void>();

    protected searchBtnClicked():void
    {
        this.search.emit(null);
    }

    protected resetBtnClicked():void
    {
        this.reset.emit(null);
    }
}
