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
               // templateUrl: 'plenty-filter.component.html',
               // styleUrls: ['plenty-filter.component.css'],
               styles:   [``],
               template: `<div style="border: 1px solid black; width: 200px;">
                              <plenty-base-toolbar>
                                <div class="btn-group" role="group">
                                  <plenty-button caption="{{searchLabel}}" (click)="searchBtnClicked()"></plenty-button>
                                  <plenty-button caption="{{resetLabel}}" (click)="resetBtnClicked()"></plenty-button>
                                </div>
                              </plenty-base-toolbar>
                            
                              <div class="input-group-v">
                                <div *ngFor="let item of inputList" #inputList>
                                  <dcl-wrapper [type]="item.template" [data]="item.data"></dcl-wrapper>
                                </div>
                              </div>
                            </div>`
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
