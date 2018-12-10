import { Resolve } from '@angular/router';

/**
 * @deprecated Will be removed in the next major release.
 */
export interface ResolverListItemInterface
{
    urlPart:string;
    routePath:string;
    resolver:{
        key:string;
        service:Resolve<any>;
    };
}
