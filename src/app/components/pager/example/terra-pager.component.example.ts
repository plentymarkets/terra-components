import {
    Component,
    OnInit
} from '@angular/core';
import { TerraPagerInterface } from '../data/terra-pager.interface';

export interface TerraPagerComponentExampleInterface
{
}

@Component({
    selector:    'terra-pager-example',
    styleUrls:   ['./terra-pager.component.example.scss'],
    templateUrl: './terra-pager.component.example.html'
})
export class TerraPagerComponentExample implements OnInit
{
    public pagingData:TerraPagerInterface<TerraPagerComponentExampleInterface>;

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
}
