import { CategoryDataInterface } from './category-data.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';

/**
 * @author ziyad.hajj-hassan
 */
export interface CategoryPagerDataInterface extends TerraPagerInterface
{
    entries:Array<CategoryDataInterface>;
}
