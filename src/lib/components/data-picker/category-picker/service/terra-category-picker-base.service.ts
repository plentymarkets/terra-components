import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoryDataInterface } from '../data/category-data.interface';
import { TerraPagerInterface } from '../../../pager/data/terra-pager.interface';

/**
 * @author ziyad.hajj-hassan
 */

@Injectable()
export abstract class TerraCategoryPickerBaseService
{
    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param categoryId
     * @param level
     */
    public abstract requestCategoryData(categoryId:string | number, level:number):Observable<TerraPagerInterface<CategoryDataInterface>>;

    public abstract requestCategoryDataById(id:number):Observable<TerraPagerInterface<CategoryDataInterface>>;
}
