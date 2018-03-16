import { Observable } from 'rxjs/Observable';
import { CategoryPagerDataInterface } from '../data/category-pager-data.interface';
import { Injectable } from '@angular/core';

/**
 * @author ziyad.hajj-hassan
 */

@Injectable()
export abstract class TerraCategoryPickerBaseService
{
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {string | number} categoryId
     * @returns {Observable<CategoryPagerDataInterface>}
     */
    public abstract requestCategoryData(categoryId:string | number):Observable<CategoryPagerDataInterface>;

    public abstract requestCategoryDataById(id:number):Observable<CategoryPagerDataInterface>;
}
