// TODO: should it also be able to remove multiple leading/trailing slashes??
/**
 * Normalizes a route's path. Specifically removes a leading and/or trailing slash.
 * @param routePath
 */
export function normalizeRoutePath(routePath: string): string {
    const withoutLeadingSlash: string = routePath.startsWith('/') ? routePath.substring(1) : routePath;
    return withoutLeadingSlash.endsWith('/')
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
