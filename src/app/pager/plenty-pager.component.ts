import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { PlentyPagerData } from './data/plenty-pager-data';
import { PlentyNumberInput } from '../forms/input/number-input/plenty-number-input.component';
import { PlentySelectBoxValue } from '../forms/select-box/value/plenty-select-box-value';

@Component({
               selector: 'plenty-pager',
               // templateUrl: 'plenty-pager.component.html',
               // styleUrls: ['plenty-pager.component.css'],
               styles:   [``],
               template: `<div class="pager">
                              <plenty-base-toolbar>
                                <div class="btn-group" role="group">
                                  <plenty-button icon="icon-control_start icon_dist_top" [isDisabled]="pagingData.currentPage == 1" (clicked)="onFirstPage()"></plenty-button>
                                  <plenty-button icon="icon-back icon_dist_top" [isDisabled]="pagingData.currentPage == 1" (clicked)="onPrevPage()"></plenty-button>
                                </div>
                                <div class="btn-group" role="group">
                                  <div class="form-group">
                                    <!--<span>{{'pagingPage' | translate:lang}}</span>-->
                                    <form  (submit)="onToPage($event, pager.value)" role="form">
                                      <plenty-number-input #pager class="pager-page" [minValue]="1" [maxValue]="onPageCount"></plenty-number-input>
                                    </form>
                                  </div>
                                  <!--<div class="pager-text">{{'pagingOf' | translate:lang}} {{pagingData.lastPage}}</div>-->
                                  <div class="pager-text">/ {{pagingData.lastPage}}</div>
                                </div>
                            
                                <div class="btn-group" role="group">
                                  <plenty-button icon="icon-next icon_dist_top" [isDisabled]="pagingData.currentPage == pagingData.lastPage" (clicked)="onNextPage()"></plenty-button>
                                  <plenty-button icon="icon-last icon_dist_top" [isDisabled]="pagingData.currentPage == pagingData.lastPage" (clicked)="onLastPage()"></plenty-button>
                                  <plenty-button icon="icon-reload icon_dist_top" [isPrimary]="true" (clicked)="onReload()"></plenty-button>
                                </div>
                                <div class="btn-group" role="group">
                                  <plenty-select-box [listBoxValues]="pagingSize" [defaultSelection]="defaultPagingSize" (valueChanged)="onChangeOffsetTo($event)"></plenty-select-box>
                                  <div class="pager-text m-l-1">
                                    <!--{{pagingData.pagingUnit | translate:lang}} {{pagingData.from}}-{{pagingData.to}} {{'pagingOf' | translate:lang}} {{pagingData.total}}-->
                                    {{pagingData.pagingUnit}} {{pagingData.from}}-{{pagingData.to}} / {{pagingData.total}}
                                  </div>
                                </div>
                              </plenty-base-toolbar>
                            </div>`
           })
export class PlentyPager implements OnInit
{
    @ViewChild(PlentyNumberInput) currentPageInput:PlentyNumberInput;

    @Input() pagingData:PlentyPagerData;
    @Input() defaultPagingSize:number;
    @Input() pagingSize:Array<PlentySelectBoxValue>;

    @Output() doPaging = new EventEmitter<PlentyPagerData>();

    constructor()
    {
    }

    ngOnInit()
    {
        if(!this.defaultPagingSize)
        {
            this.defaultPagingSize = 25;
        }

        if(!this.pagingSize)
        {
            this.pagingSize = [
                {
                    value:   25,
                    caption: '25'
                },
                {
                    value:   50,
                    caption: '50'
                },
                {
                    value:   75,
                    caption: '75'
                },
                {
                    value:   100,
                    caption: '100'
                }
            ];
        }

        if(!this.pagingData)
        {
            this.pagingData = {
                pagingUnit:  'Entries',
                total:       0,
                currentPage: 1,
                perPage:     0,
                lastPage:    0,
                from:        0,
                to:          0
            };
        }

        this.updateCurrentPageInput();
    }

    private updateCurrentPageInput()
    {
        this.currentPageInput.value = this.pagingData.currentPage;
    }

    public onFirstPage():void
    {
        this.pagingData.currentPage = 1;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onPrevPage():void
    {
        this.pagingData.currentPage -= 1;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onNextPage():void
    {
        this.pagingData.currentPage += 1;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onLastPage():void
    {
        this.pagingData.currentPage = this.pagingData.lastPage;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onReload():void
    {
        this.doPaging
            .emit(this.pagingData);
    }

    public onToPage(event:any,
                    pageNumber:number):void
    {
        event.preventDefault();

        this.pagingData.currentPage = pageNumber;

        this.doPaging
            .emit(this.pagingData);
    }

    public onChangeOffsetTo(selectedOffset:PlentySelectBoxValue):void
    {
        this.pagingData.currentPage = 1;
        this.updateCurrentPageInput();
        this.pagingData.perPage = selectedOffset.value;

        this.doPaging
            .emit(this.pagingData);
    }
}
