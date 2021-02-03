/**
 * Normalizes a route's path. Specifically removes a leading and/or trailing slash.
 * @param routePath
 */
export function normalizeRoutePath(routePath: string | null | undefined): string | null | undefined {
    const withoutLeadingSlash: string = routePath?.startsWith('/') ? routePath.substring(1) : routePath;
    return withoutLeadingSlash?.endsWith('/')
        ? withoutLeadingSlash.substring(0, withoutLeadingSlash.length - 1)
        : withoutLeadingSlash;
}

/**
 * Compares a list of routePath segments with a list of url segments and returns whether they are matching.
 * A routePath segment matches a url segment if they are equal or if the routePath segment is a placeholder (starts with ':').
 * @param routePathSegments
 * @param urlSegments
 */
export function compareSegments(routePathSegments: Array<string>, urlSegments: Array<string>): boolean {
    if (!routePathSegments || !urlSegments || routePathSegments.length !== urlSegments.length) {
        return false;
    }

    return routePathSegments.every((routePathSegment: string, index: number) => {
        const urlSegment: string = urlSegments[index]; // segment of the url at the same index
        return routePathSegment === urlSegment || routePathSegment.startsWith(':');
    });
}

/**
 * Tries to find a matching route path to the given #url in a list of #routePaths
 * @param url
 * @param routePaths
 */
export function findMatchingRoutePath(url: string, routePaths: Array<string>): string | undefined {
    // check if parameters are defined
    if (!url || !routePaths) {
        return undefined;
    }

    // split the url into its segments
    const urlSegments: Array<string> = url.split('/');

    // get all potentially matching route paths - those must include parameters AND have the same amount of segments as the given url
    const potentiallyMatchingRoutePaths: Array<string> = routePaths.filter((routePath: string) => {
        return routePath.includes(':') && routePath.split('/').length === urlSegments.length;
    });

    // scan through all potential matches to check if one of it really matches the given url
    return potentiallyMatchingRoutePaths.find((routePath: string) => {
        // split the current route path into its segments
        const routePathSegments: Array<string> = routePath.split('/');

        // compare the segments of the route path with those of the url. do they match?
        return compareSegments(routePathSegments, urlSegments);
    });
}
