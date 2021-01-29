import { compareSegments, normalizeRoutePath } from './route-path';

describe('normalizeRoutePath', () => {
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
