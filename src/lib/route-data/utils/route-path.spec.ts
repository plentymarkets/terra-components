import { compareSegments, findMatchingRoutePath, normalizeRoutePath } from './route-path';

describe('normalizeRoutePath', () => {
    it('should return `null | undefined` when `null | undefined` is passed', () => {
        expect(normalizeRoutePath(null)).toBeNull();
        expect(normalizeRoutePath(undefined)).toBeUndefined();
    });

    it('should remove a leading slash', () => {
        expect(normalizeRoutePath('/test')).toBe('test');
        expect(normalizeRoutePath('/foo/bar')).toBe('foo/bar');
    });

    it('should remove a trailing slash', () => {
        expect(normalizeRoutePath('test/')).toBe('test');
        expect(normalizeRoutePath('foo/bar/')).toBe('foo/bar');
    });

    it('should remove both, a leading and a trailing slash', () => {
        expect(normalizeRoutePath('/test/')).toBe('test');
        expect(normalizeRoutePath('/foo/bar/')).toBe('foo/bar');
    });

    it('should NOT remove any character if there is no leading or trailing slash', () => {
        expect(normalizeRoutePath('test')).toBe('test');
        expect(normalizeRoutePath('foo/bar')).toBe('foo/bar');
    });
});

describe('compareSegments', () => {
    it('should return false if any list of segments is `null` or `undefined`', () => {
        expect(compareSegments(null, undefined)).toBe(false);
    });

    it('should return false when the amount of segments do not match', () => {
        expect(compareSegments(['hallo', 'dasd'], [])).toBe(false);
    });

    it('should be able to handle route paths without parameters', () => {
        expect(compareSegments(['foo', 'bar'], ['foo', 'bar'])).toBe(true);
    });

    it('should return true when a list of url segments matches a list of route path segments that include parameters', () => {
        expect(compareSegments(['foo', ':bar'], ['foo', 'bar'])).toBe(true);
    });
});

describe('findMatchingRoutePath', () => {
    it('should return undefined for an `null | undefined` url', () => {
        expect(findMatchingRoutePath(null, [])).toBeUndefined();
        expect(findMatchingRoutePath(undefined, [])).toBeUndefined();
    });

    it('should return undefined for an `null | undefined` list of route paths', () => {
        const url: string = 'my/url';
        expect(findMatchingRoutePath(url, null)).toBeUndefined();
        expect(findMatchingRoutePath(url, undefined)).toBeUndefined();
    });

    it('should return undefined when no matching route path can be found for the given url', () => {
        expect(findMatchingRoutePath('my-url', [])).toBeUndefined();
    });

    it('should find a matching, parameterised path to a given url', () => {
        const path: string = 'item/list/:id';
        expect(findMatchingRoutePath('item/list/1', [path])).toBe(path);
    });
});
