import {
    Component,
    OnInit
} from '@angular/core';
import { TerraPagerInterface } from '../data/terra-pager.interface';

export interface TerraPagerComponentExampleInterface
{

}

@Component({
    selector: 'terra-pager-example',
    styles:   [require('./terra-pager.component.example.scss')],
    template: require('./terra-pager.component.example.html'),
})
export class TerraPagerComponentExample implements OnInit
{


    private _pagingData:TerraPagerInterface<TerraPagerComponentExampleInterface>;

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

    public get pagingData():TerraPagerInterface<TerraPagerComponentExampleInterface>
    {
        return this._pagingData;
    }

    public set pagingData(value:TerraPagerInterface<TerraPagerComponentExampleInterface>)
    {
        this._pagingData = value;
    }

}
