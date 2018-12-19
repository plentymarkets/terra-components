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
     * @description Set the tooltip of the search button.
     */
    @Input()
    public searchTooltip:string;

    /**
     * @description Set the tooltip of the reset button.
     */
    @Input()
    public resetTooltip:string;

    /**
     * @description Set the function which will be executed on click of the search button.
     */
    @Output()
    public onSearchBtnClicked:EventEmitter<any> = new EventEmitter<any>();

    /**
     * @description Set the function which will be executed on click of the reset button.
     */
    @Output()
    public onResetBtnClicked:EventEmitter<any> = new EventEmitter<any>();

    protected searchBtnClicked():void
    {
        this.onSearchBtnClicked.emit(null);
    }

    protected resetBtnClicked():void
    {
        this.onResetBtnClicked.emit(null);
    }
}
