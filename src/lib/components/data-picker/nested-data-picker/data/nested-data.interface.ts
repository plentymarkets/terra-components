import { NestedDetailDataInterface } from './nested-detail-data.interface';

/**
 * @author chirila-ioan-daniel
 */
export interface NestedDataInterface<T> {
  id?: number;
  hasChildren?: boolean;
  details?: Array<NestedDetailDataInterface>;
  parentId?: number;
  isLastPage?: boolean;
  data?: T;
}
