import { Params } from '@angular/router';

export class TerraBreadcrumb
{
    public name:string;
    public routerLink:string;
    public isHidden:boolean;
    public parent:TerraBreadcrumb;
    public queryParams:Params;

    constructor(name:string, parent:TerraBreadcrumb, routerLink:string, queryParams?:Params)
    {
        this.name = name;
        this.parent = parent;
        this.routerLink = routerLink;
        this.isHidden = false;
        this.queryParams = queryParams;
    }
}
