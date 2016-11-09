import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';

@Component({
               selector: 'plenty-filter',
               styles:   [require('./plenty-filter.component.scss').toString()],
               template: require('./plenty-filter.component.html')
           })
export class PlentyFilter implements OnInit
{
    
    @ViewChild('viewChildInputList') viewChildInputList;
    @Input() inputSearchLabel:string;
    @Input() inputResetLabel:string;
    @Input() inputInputList:any[];
    @Output() outputOnSearchBtnClicked = new EventEmitter<any>();
    @Output() outputOnResetBtnClicked = new EventEmitter<any>();
    
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
}
