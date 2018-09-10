import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { TerraPagerInterface } from '../../../..';

/**
 * @author chirila-ioan-daniel
 */

@Injectable()
export abstract class TerraNestedDataPickerBaseService<T>
{
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @returns {Observable<Array<NestedDataInterface>>}
     * @param parentId
     */
    public abstract requestNestedData(parentId:string | number):Observable<TerraPagerInterface<T>>;

    public abstract requestNestedDataById(id:number):Observable<TerraPagerInterface<T>>;

}
