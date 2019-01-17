import {
    Component,
    EventEmitter,
    Output
} from '@angular/core';

/**
 * @author mkunze
 * @description This component provides the default template and functionalities to display form fields which are supposed to set filters
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
}
