import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { NestedDataInterface } from '../../data/nested-data.interface';
import { TerraNestedDataPickerBaseService } from '../../service/terra-nested-data-picker-base.service';
import { TerraPagerInterface } from '../../../../pager/data/terra-pager.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class NestedPickerExampleService extends TerraNestedDataPickerBaseService<{}> {
  public parents: TerraPagerInterface<NestedDataInterface<any>> = {
    entries: [
      {
        id: 1,
        hasChildren: true,
        details: [
          {
            detailId: 1,
            name: 'Parent 1'
          }
        ]
      },
      {
        id: 2,
        hasChildren: true,
        details: [
          {
            detailId: 2,
            name: 'Parent 2'
          }
        ]
      },
      {
        id: 3,
        hasChildren: true,
        details: [
          {
            detailId: 3,
            name: 'Parent 3'
          }
        ]
      }
    ],
    firstOnPage: 1,
    isLastPage: true,
    itemsPerPage: 50,
    lastOnPage: 3,
    lastPageNumber: 1,
    page: 1,
    totalsCount: 3
  };

  public children: TerraPagerInterface<NestedDataInterface<any>> = {
    entries: [
      {
        id: 1,
        parentId: 1,
        details: [
          {
            detailId: 1,
            name: 'Child 1'
          }
        ]
      },
      {
        id: 2,
        parentId: 1,
        details: [
          {
            detailId: 1,
            name: 'Child 2'
          }
        ]
      },
      {
        id: 3,
        parentId: 2,
        details: [
          {
            detailId: 2,
            name: 'Child 3'
          }
        ]
      },
      {
        id: 4,
        parentId: 3,
        details: [
          {
            detailId: 3,
            name: 'Child 4'
          }
        ]
      }
    ],
    firstOnPage: 1,
    isLastPage: true,
    itemsPerPage: 50,
    lastOnPage: 3,
    lastPageNumber: 1,
    page: 1,
    totalsCount: 3
  };

  public requestNestedData(
    parentId: string | number
  ): Observable<TerraPagerInterface<NestedDataInterface<any>>> {
    let data: TerraPagerInterface<NestedDataInterface<any>> = this.parents;
    if (!isNullOrUndefined(parentId)) {
      data = {
        entries: [],
        firstOnPage: 1,
        isLastPage: true,
        itemsPerPage: 50,
        lastOnPage: 3,
        lastPageNumber: 1,
        page: 1,
        totalsCount: 3
      };
      this.children.entries.forEach((child: NestedDataInterface<any>) => {
        if (child.parentId === parentId) {
          data.entries.push(child);
        }
      });
    }

    return of(data);
  }

  public requestNestedDataById(
    id: number
  ): Observable<TerraPagerInterface<NestedDataInterface<any>>> {
    let children: TerraPagerInterface<{}> = {
      entries: [],
      firstOnPage: 1,
      isLastPage: true,
      itemsPerPage: 50,
      lastOnPage: 3,
      lastPageNumber: 1,
      page: 1,
      totalsCount: 3
    };
    this.children.entries.forEach((child: NestedDataInterface<any>) => {
      if (child.parentId === id) {
        children.entries.push(child);
      }
    });
    return of(children);
  }
}
