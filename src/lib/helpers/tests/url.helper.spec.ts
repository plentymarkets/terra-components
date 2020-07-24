import { UrlHelper } from '../url.helper';

describe('UrlHelper', () =>
{
    let url:string;

    it('should remove a leading slash', () =>
    {
        url = 'https://domain.com';
        expect(UrlHelper.removeLeadingSlash(url)).toBe(url);
        url = '/domain.com';
        expect(UrlHelper.removeLeadingSlash(url)).toBe('domain.com');
    });

    it('should remove a fragment from an url', () =>
    {
        url = 'http://domain.com';
        expect(UrlHelper.removeFragment(url)).toBe(url);
        url = 'http://domain.com/page#fragment';
        expect(UrlHelper.removeFragment(url)).toBe('http://domain.com/page');
    });

    it('should remove query params from an url', () =>
    {
        url = 'http://domain.com/page';
        expect(UrlHelper.removeQueryParams(url)).toBe(url);
        url = 'http://domain.com/page?name=first&chapter=intro#fragment';
        expect(UrlHelper.removeQueryParams(url)).toBe('http://domain.com/page#fragment');
        url = 'http://domain.com/page?name=first&chapter=intro';
        expect(UrlHelper.removeQueryParams(url)).toBe('http://domain.com/page');
    });

    it('should clean url from leading slash, query params and fragment', () =>
    {
        url = 'http://domain.com/page';
        expect(UrlHelper.getCleanUrl(url)).toBe(url);
        url = '/domain.com/page?name=first&chapter=intro#fragment';
        expect(UrlHelper.getCleanUrl(url)).toBe('domain.com/page');
    });
});
