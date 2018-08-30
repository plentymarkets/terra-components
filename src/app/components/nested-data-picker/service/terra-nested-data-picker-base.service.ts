import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { NestedPagerDataInterface } from '../data/nested-pager-data.interface';
/**
 * @author chirila-ioan-daniel
 */

@Injectable()
export abstract class TerraNestedDataPickerBaseService<T>
{
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {string | number} dataId
     * @returns {Observable<Array<NestedDataInterface>>}
     */
    public abstract requestNestedData(parentId:string | number):Observable<NestedPagerDataInterface>;

    public abstract requestNestedDataById(id:number):Observable<NestedPagerDataInterface>;

}
