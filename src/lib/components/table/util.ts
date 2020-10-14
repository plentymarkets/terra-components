import { RequestParameterInterface, TerraFilter, TerraPagerInterface } from '../..';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

export function createRequestParams(
    filter: TerraFilter<{ [key: string]: unknown }>,
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
