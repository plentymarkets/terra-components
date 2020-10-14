import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TerraFilter } from './filter';
import { RequestParameterInterface } from './request-parameter.interface';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

/**
 * Checks if the given results is a paginated one
 * @param result
 */
export function isPaginated<T>(result: any): result is TerraPagerInterface<T> {
    return (
        'page' in result &&
        'totalsCount' in result &&
        'isLastPage' in result &&
        'lastPageNumber' in result &&
        'firstOnPage' in result &&
        'lastOnPage' in result &&
        'itemsPerPage' in result &&
        'entries' in result
    );
}

/**
 * Creates an Object containing all params for a request based on the filter, paginator and sort.
 * @param filter
 * @param paginator
 * @param sort
 */
export function createRequestParams(
    filter: TerraFilter<Object>,
    paginator: MatPaginator,
    sort: MatSort
): RequestParameterInterface {
    const requestParams: RequestParameterInterface = filter ? { ...filter.filterParameter } : {};

    if (paginator) {
        requestParams.page = paginator.pageIndex + 1;
        requestParams.itemsPerPage = paginator.pageSize;
    }

    if (sort) {
        requestParams.sortBy = sort.active;
        requestParams.sortOrder = sort.direction;
    }

    return requestParams;
}
