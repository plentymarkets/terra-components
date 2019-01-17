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
     * @description Notifies when the search button has been clicked or the enter key has been pressed.
     */
    @Output()
    public search:EventEmitter<void> = new EventEmitter<void>();

    /**
     * @description Notifies when the reset button has been clicked
     */
    @Output()
    public reset:EventEmitter<void> = new EventEmitter<void>();
}
