import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';

export function getBasePathForActivatedRoute(route: ActivatedRouteSnapshot): string {
    let basePath: string = route.pathFromRoot
        .map((activatedRoute: ActivatedRouteSnapshot) => {
            return activatedRoute.url.map((urlSegment: UrlSegment) => urlSegment.path).join('/');
        })
        .filter((urlSegment: string) => urlSegment !== '')
        .join('/');

    if (!basePath.startsWith('/')) {
        basePath = '/' + basePath; // it should always start with a slash since it is a absolute url
    }

    if (basePath.endsWith('/')) {
        basePath = basePath.substr(0, basePath.length - 1); // it should not end with a slash
    }

    return basePath;
}
