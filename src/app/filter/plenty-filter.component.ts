import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';

@Component({
               selector: 'terra-filter',
               styles:   [require('./plenty-filter.component.scss').toString()],
               template: require('./plenty-filter.component.html')
           })
export class PlentyFilter implements OnInit
{

    @Input() searchLabel:string;
    @Input() resetLabel:string;
    @Input() inputList:any[];
    @Output() onSearchBtnClicked = new EventEmitter<any>();
    @Output() onResetBtnClicked = new EventEmitter<any>();
    @ViewChild('inputList') childs;

    constructor()
    {
    }

    ngOnInit()
    {
    }

    private searchBtnClicked():void
    {
        this.onSearchBtnClicked.emit(null);
    }

    private resetBtnClicked():void
    {
        this.onResetBtnClicked.emit(null);
    }

}
