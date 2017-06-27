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

    @Input() inputSearchLabel:string;
    @Input() inputResetLabel:string;
    @Input() inputInputList:any[];

    @Output() outputOnSearchBtnClicked = new EventEmitter<any>();
    @Output() outputOnResetBtnClicked = new EventEmitter<any>();
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
