import { CategoryDetailDataInterface } from './category-detail-data.interface';
import { CategoryClientInterface } from './category-client.interface';

/**
 * @author ziyad.hajj-hassan
 */
export interface CategoryDataInterface {
  id: number;
  level?: number;
  linklist?: string;
  sitemap?: string;
  parentCategoryId?: number;
  right?: string;
  type?: string;
  hasChildren?: boolean;
  details?: Array<CategoryDetailDataInterface>;
  clients?: Array<CategoryClientInterface>;
}
