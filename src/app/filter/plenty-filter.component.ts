import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';

@Component({
               selector:    'plenty-filter',
               templateUrl: 'plenty-filter.component.html',
               styleUrls:   ['plenty-filter.component.css']
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
