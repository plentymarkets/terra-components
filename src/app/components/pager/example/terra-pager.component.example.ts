import {
    Component,
    OnInit
} from '@angular/core';
import { TerraPagerInterface } from '../data/terra-pager.interface';

@Component({
    selector: 'terra-pager-example',
    styles:   [require('./terra-pager.component.example.scss')],
    template: require('./terra-pager.component.example.html'),
})
export class TerraPagerComponentExample implements OnInit
{
    private _pagingData:TerraPagerInterface;

    public ngOnInit():void
    {
        this.pagingData = {
            pagingUnit:     'pagingEntries',
            totalsCount:    345,
            page:           1,
            itemsPerPage:   50,
            lastPageNumber: 7,
            firstOnPage:    1,
            lastOnPage:     50,
            isLastPage:     false
        };
    }

    public get pagingData():TerraPagerInterface
    {
        return this._pagingData;
    }

    public set pagingData(value:TerraPagerInterface)
    {
        this._pagingData = value;
    }

}
