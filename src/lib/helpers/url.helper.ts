// @dynamic
export class UrlHelper {
    public static removeLeadingSlash(url: string): string {
        if (url.startsWith('/')) {
            // remove leading slash in url
            return url.slice(1, url.length);
        }

        return url;
    }

    public static removeFragment(url: string): string {
        if (url.includes('#')) {
            return url.slice(0, url.indexOf('#'));
        }

        return url;
    }

    public static removeQueryParams(url: string): string {
        if (url.includes('?')) {
            return url.includes('#')
                ? url.replace(url.slice(url.indexOf('?'), url.indexOf('#')), '')
                : url.slice(0, url.indexOf('?'));
        }

        return url;
    }

    public static getCleanUrl(url: string): string {
        return this.removeFragment(this.removeQueryParams(this.removeLeadingSlash(url)));
    }
}
