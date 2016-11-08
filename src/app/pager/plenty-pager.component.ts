import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import { PlentyPagerData } from './data/plenty-pager-data';
import { PlentyNumberInput } from '../forms/input/number-input/plenty-number-input.component';
import { PlentySelectBoxValue } from '../forms/select-box/value/plenty-select-box-value';

@Component({
               selector:      'plenty-pager',
               styles:        [require('./plenty-pager.component.scss').toString()],
               template:      require('./plenty-pager.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class PlentyPager implements OnInit
{
    @ViewChild(PlentyNumberInput) currentPageInput: PlentyNumberInput;

    @Input() pagingData: PlentyPagerData;
    @Input() defaultPagingSize: number;
    @Input() pagingSize: Array<PlentySelectBoxValue>;

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

    public onFirstPage(): void
    {
        this.pagingData.currentPage = 1;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onPrevPage(): void
    {
        this.pagingData.currentPage -= 1;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onNextPage(): void
    {
        this.pagingData.currentPage += 1;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onLastPage(): void
    {
        this.pagingData.currentPage = this.pagingData.lastPage;
        this.updateCurrentPageInput();

        this.doPaging
            .emit(this.pagingData);
    }

    public onReload(): void
    {
        this.doPaging
            .emit(this.pagingData);
    }

    public onToPage(event: any,
                    pageNumber: number): void
    {
        event.preventDefault();

        this.pagingData.currentPage = pageNumber;

        this.doPaging
            .emit(this.pagingData);
    }

    public onChangeOffsetTo(selectedOffset: PlentySelectBoxValue): void
    {
        this.pagingData.currentPage = 1;
        this.updateCurrentPageInput();
        this.pagingData.perPage = selectedOffset.value;

        this.doPaging
            .emit(this.pagingData);
    }
}
