import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { NestedDataInterface } from '../data/nested-data.interface';

/**
 * @author chirila-ioan-daniel
 */

@Injectable()
export abstract class TerraNestedDataPickerBaseService
{
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {string | number} dataId
     * @returns {Observable<Array<NestedDataInterface>>}
     */
    public abstract requestNestedData():Observable<Array<NestedDataInterface>>;
}
