import { Resolve } from '@angular/router';

export interface ResolverListItemInterface
{
    urlPart:string;
    routePath:string;
    resolver:{
        key:string;
        service:Resolve<any>;
    };
}
