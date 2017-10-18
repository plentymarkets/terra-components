import {
    Component,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output
} from '@angular/core';
import { TerraPagerInterface } from './data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../forms/select-box/data/terra-select-box.interface';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'terra-pager',
    styles:   [require('./terra-pager.component.scss')],
    template: require('./terra-pager.component.html')
})
export class TerraPagerComponent implements OnInit
{
    @Input() inputPagingData:TerraPagerInterface;
    @Input() inputDefaultPagingSize:number;
    @Input() inputPagingSize:Array<TerraSelectBoxValueInterface>;
    @Input() inputRequestPending:boolean;

    @Output() outputDoPaging = new EventEmitter<TerraPagerInterface>();

    private _pagingClicks = new Subject();

    constructor(private zone:NgZone)
    {
    }

    ngOnInit()
    {
        this._pagingClicks.debounceTime(500).subscribe((e:TerraPagerInterface) => this.outputDoPaging.emit(e));

        if(!this.inputDefaultPagingSize)
        {
            this.inputDefaultPagingSize = 25;
        }

        if(!this.inputPagingSize)
        {
            this.inputPagingSize = [
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

        if(!this.inputPagingData)
        {
            this.inputPagingData = {
                pagingUnit:     '',
                totalsCount:    0,
                page:           1,
                itemsPerPage:   0,
                lastPageNumber: 0,
                firstOnPage:    0,
                lastOnPage:     0,
                isLastPage:     false
            };
        }
    }

    public onFirstPage():void
    {
        if(!this.inputRequestPending)
        {
            this.inputPagingData.page = 1;
        }
        this.notify();
    }

    public onPrevPage():void
    {
        if(!this.inputRequestPending)
        {
            this.inputPagingData.page -= 1;
        }
        this.notify();
    }

    public onNextPage():void
    {
        if(!this.inputRequestPending)
        {
            this.inputPagingData.page += 1;
        }
        this.notify();
    }

    public onLastPage():void
    {
        if(!this.inputRequestPending)
        {
            this.inputPagingData.page = this.inputPagingData.lastPageNumber;
        }
        this.notify();
    }

    public onReload():void
    {
        this.notify();
    }

    public onToPage(event:any, pageNumber:number):void
    {
        event.preventDefault();
        this.inputPagingData.page = pageNumber;
        this.outputDoPaging.emit(this.inputPagingData);
    }

    public onChangeOffsetTo(selectedOffset:TerraSelectBoxValueInterface):void
    {
        this.inputPagingData.page = 1;
        this.inputPagingData.itemsPerPage = selectedOffset.value;
        this.outputDoPaging.emit(this.inputPagingData);
    }

    private notify():void
    {
        if(!this.inputRequestPending)
        {
            this._pagingClicks.next(this.inputPagingData);
        }
    }
}
