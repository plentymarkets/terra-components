import { createRequestParams, isPaginated } from './util';
import { TerraFilter } from './filter';
import { RequestParameterInterface } from './request-parameter.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

describe('utility', () => {
    describe('isPaginated', () => {
        it('should return true if value is of type TerraPagerInterface', () => {
            const paginatedResult: TerraPagerInterface<any> = {
                page: 1,
                totalsCount: 2,
                firstOnPage: 1,
                lastOnPage: 2,
                lastPageNumber: 1,
                isLastPage: true,
                itemsPerPage: 25,
                entries: []
            };
            expect(isPaginated(paginatedResult)).toBe(true);
        });

        it('should return false if the given value is not of type TerraPagerInterface', () => {
            expect(isPaginated([])).toBe(false);
            expect(isPaginated({})).toBe(false);
            expect(isPaginated({ page: 1 })).toBe(false);
            // to be continued..
        });
    });

    describe('createRequestParams', () => {
        it('should return an empty object if filter, paginator and sort are not set', () => {
            expect(createRequestParams(null, null, null)).toEqual({});
            expect(createRequestParams(undefined, undefined, undefined)).toEqual({});
        });

        it(`should include the filter's parameters if given`, () => {
            const params: { [key: string]: unknown } = { id: 123, foo: 'bar' };
            const filter: TerraFilter<any> = new TerraFilter();
            filter.filterParameter = params;

            const requestParams: RequestParameterInterface = createRequestParams(filter, null, null);
            expect(requestParams).toEqual(params);
            expect(requestParams).not.toBe(params); // should return an new object reference
        });

        it('should include paging information if paginator is given', () => {
            const paginator: Partial<MatPaginator> = { pageIndex: 0, pageSize: 25 };
            const params: RequestParameterInterface = createRequestParams(null, paginator as MatPaginator, null);
            expect(params.itemsPerPage).toBe(paginator.pageSize);
            expect(params.page).toBe(paginator.pageIndex + 1);
        });

        it('should include sort information if MatSort is given', () => {
            const sort: Partial<MatSort> = { active: 'id', direction: 'asc' };
            const params: RequestParameterInterface = createRequestParams(null, null, sort as MatSort);
            expect(params.sortBy).toBe(sort.active);
            expect(params.sortOrder).toBe(sort.direction);
        });
    });
});
