import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { TerraPagerInterface } from '../../../../';
import { CategoryDataInterface } from '../data/category-data.interface';

/**
 * @author ziyad.hajj-hassan
 */

@Injectable()
export abstract class TerraCategoryPickerBaseService
{
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {string | number} categoryId
     * @returns {Observable<TerraPagerInterface<CategoryDataInterface>>}
     */
    public abstract requestCategoryData(categoryId:string | number):Observable<TerraPagerInterface<CategoryDataInterface>>;

    public abstract requestCategoryDataById(id:number):Observable<TerraPagerInterface<CategoryDataInterface>>;
}
