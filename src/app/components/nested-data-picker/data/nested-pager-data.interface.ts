import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { NestedDataInterface } from './nested-data.interface';

/**
 * @author chirila
 */
export interface NestedPagerDataInterface extends TerraPagerInterface
{
    entries:Array<NestedDataInterface<{}>>;
}
