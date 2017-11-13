import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

/**
 * @author mscharf
 */
@Component({
    selector: 'terra-filter',
    styles:   [require('./terra-filter.component.scss')],
    template: require('./terra-filter.component.html')
})
export class TerraFilterComponent implements OnInit
{
    @ViewChild('viewChildInputList') viewChildInputList;

    /**
     * @description Set the tooltip of the search button.
     * */
    @Input() inputSearchLabel:string;
    /**
     * @description Set the tooltip of the reset button.
     * */
    @Input() inputResetLabel:string;
    /**
     * @deprecated Will be removed in an upcoming release.
     * */
    @Input() inputInputList:any[];
    /**
     * @description Set the function which will be executed on click of the search button.
     * */
    @Output() outputOnSearchBtnClicked = new EventEmitter<any>();
    /**
     * @description Set the function which will be executed on click of the reset button.
     * */
    @Output() outputOnResetBtnClicked = new EventEmitter<any>();
    /**
     * @description Set the function which will be executed on hitting enter.
     * */
    @Output() outputOnEnterSubmit = new EventEmitter<any>();

    constructor()
    {
    }

    ngOnInit()
    {
    }

    private searchBtnClicked():void
    {
        this.outputOnSearchBtnClicked.emit(null);
    }

    private resetBtnClicked():void
    {
        this.outputOnResetBtnClicked.emit(null);
    }

    private onSubmit():void
    {
        this.outputOnEnterSubmit.emit(null);
    }
}
