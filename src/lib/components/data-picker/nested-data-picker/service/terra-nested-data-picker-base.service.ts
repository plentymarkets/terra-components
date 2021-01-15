import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';

/**
 * @author chirila-ioan-daniel
 */

@Injectable()
export abstract class TerraNestedDataPickerBaseService<T> {
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param parentId
     */
    public abstract requestNestedData(parentId: string | number): Observable<TerraPagerInterface<T>>;

    /**
     * @description Placeholder for the specific single item retrieval method.
     * @param id
     */
    public abstract requestNestedDataById(id: number): Observable<TerraPagerInterface<T>>;
}
