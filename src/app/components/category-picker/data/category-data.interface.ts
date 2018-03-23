import { CategoryDetailDataInterface } from './category-detail-data.interface';

/**
 * @author ziyad.hajj-hassan
 */
export interface CategoryDataInterface
{
    id:number;
    level?:number;
    linklist?:string;
    parentCategoryId?:number;
    right?:string;
    type?:string;
    hasChildren?:boolean;
    details?:Array<CategoryDetailDataInterface>;
}
