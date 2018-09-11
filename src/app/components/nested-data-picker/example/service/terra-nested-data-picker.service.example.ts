import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { NestedDataInterface } from '../../../nested-data-picker/data/nested-data.interface';
import { TerraNestedDataPickerBaseService } from '../../../nested-data-picker/service/terra-nested-data-picker-base.service';
import { of } from 'rxjs/observable/of';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';

export interface NestedPickerExampleDetailInterface
{
    detailId:number;
    name:string;
}

@Injectable()
export class NestedPickerExampleService extends TerraNestedDataPickerBaseService<{}>
{
    public parents:TerraPagerInterface<NestedDataInterface<NestedPickerExampleDetailInterface>> = {
        entries:        [
            {
                id:          1,
                hasChildren: true,
                details:     [
                    {
                        detailId: 1,
                        name:     'Parent 1'
                    }
                ]
            },
            {
                id:          2,
                hasChildren: true,
                details:     [
                    {
                        detailId: 2,
                        name:     'Parent 2'
                    }
                ]
            },
            {
                id:          3,
                hasChildren: true,
                details:     [
                    {
                        detailId: 3,
                        name:     'Parent 3'
                    }
                ]
            }
        ],
        firstOnPage:    1,
        isLastPage:     true,
        itemsPerPage:   50,
        lastOnPage:     3,
        lastPageNumber: 1,
        page:           1,
        totalsCount:    3
    };

    public children:TerraPagerInterface<NestedDataInterface<NestedPickerExampleDetailInterface>> = {
        entries:        [
            {
                id:       1,
                parentId: 1,
                details:  [
                    {
                        detailId: 1,
                        name:     'Child 1'
                    }
                ]
            },
            {
                id:       2,
                parentId: 1,
                details:  [
                    {
                        detailId: 1,
                        name:     'Child 2'
                    }
                ]
            },
            {
                id:       3,
                parentId: 2,
                details:  [
                    {
                        detailId: 2,
                        name:     'Child 3'
                    }
                ]
            },
            {
                id:       4,
                parentId: 3,
                details:  [
                    {
                        detailId: 3,
                        name:     'Child 4'
                    }
                ]
            }
        ],
        firstOnPage:    1,
        isLastPage:     true,
        itemsPerPage:   50,
        lastOnPage:     3,
        lastPageNumber: 1,
        page:           1,
        totalsCount:    3
    };

    public requestNestedData(parentId:string | number):Observable<TerraPagerInterface<NestedDataInterface<NestedPickerExampleDetailInterface>>>
    {
        let data:TerraPagerInterface<NestedDataInterface<NestedPickerExampleDetailInterface>> = this.parents;
        if(!isNullOrUndefined(parentId))
        {
            data = {
                entries:        [],
                firstOnPage:    1,
                isLastPage:     true,
                itemsPerPage:   50,
                lastOnPage:     3,
                lastPageNumber: 1,
                page:           1,
                totalsCount:    3
            };
            this.children.entries.forEach((child:NestedDataInterface<NestedPickerExampleDetailInterface>) =>
            {
                if(child.parentId === parentId)
                {
                    data.entries.push(child);
                }
            });
        }

        return of(data);
    }

    public requestNestedDataById(id:number):Observable<TerraPagerInterface<NestedDataInterface<NestedPickerExampleDetailInterface>>>
    {
        let children:TerraPagerInterface<{}> = {
            entries:        [],
            firstOnPage:    1,
            isLastPage:     true,
            itemsPerPage:   50,
            lastOnPage:     3,
            lastPageNumber: 1,
            page:           1,
            totalsCount:    3
        };
        this.children.entries.forEach((child:NestedDataInterface<NestedPickerExampleDetailInterface>) =>
        {
            if(child.parentId === id)
            {
                children.entries.push(child);
            }
        });
        return of(children);
    }
}
