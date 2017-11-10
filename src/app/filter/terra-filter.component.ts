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
     * @description Set the tooltip of search button.
     * */
    @Input() inputSearchLabel:string;
    /**
     * @description Set the tooltip of reset button.
     * */
    @Input() inputResetLabel:string;
    /**
     * @deprecated Will be removed in an upcoming release.
     * */
    @Input() inputInputList:any[];
    /**
     * @description Set the function which will executed on search button click.
     * */
    @Output() outputOnSearchBtnClicked = new EventEmitter<any>();
    /**
     * @description Set the function which will executed on reset button click.
     * */
    @Output() outputOnResetBtnClicked = new EventEmitter<any>();
    /**
     * @description Set the function which will executed on enter.
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
