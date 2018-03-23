import { CategoryDataInterface } from './category-data.interface';

/**
 * @author ziyad.hajj-hassan
 */
export interface CategoryPagerDataInterface
{
    page:number;
    totalsCount:number;
    isLastPage:boolean;
    entries:Array<CategoryDataInterface>;
}
