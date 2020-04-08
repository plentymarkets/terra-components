import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

/**
 * @author mscharf
 * @deprecated This component will be deleted in the next major release. Use `<tc-filter>` instead.
 */
@Component({
    selector:    'terra-filter',
    templateUrl: './terra-filter.component.html'
})
export class TerraFilterComponent
{
    /**
     * @description Set the tooltip of the search button.
     */
    @Input()
    public inputSearchLabel:string;

    /**
     * @description Set the tooltip of the reset button.
     */
    @Input()
    public inputResetLabel:string;

    /**
     * @description Set the function which will be executed on click of the search button.
     */
    @Output()
    public outputOnSearchBtnClicked:EventEmitter<any> = new EventEmitter<any>();

    /**
     * @description Set the function which will be executed on click of the reset button.
     */
    @Output()
    public outputOnResetBtnClicked:EventEmitter<any> = new EventEmitter<any>();

    /**
     * @description Set the function which will be executed on hitting enter.
     */
    @Output()
    public outputOnEnterSubmit:EventEmitter<any> = new EventEmitter<any>();

    public _searchBtnClicked():void
    {
        this.outputOnSearchBtnClicked.emit(null);
    }

    public _resetBtnClicked():void
    {
        this.outputOnResetBtnClicked.emit(null);
    }

    public _onSubmit():void
    {
        this.outputOnEnterSubmit.emit(null);
    }
}
