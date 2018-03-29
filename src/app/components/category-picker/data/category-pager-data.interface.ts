import { CategoryDataInterface } from './category-data.interface';
import { TerraPagerInterface } from '../../../../';

/**
 * @author ziyad.hajj-hassan
 */
export interface CategoryPagerDataInterface extends TerraPagerInterface
{
    entries:Array<CategoryDataInterface>;
}
