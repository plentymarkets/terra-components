export class TerraBreadcrumb
{
    public name:string;
    public routerLink:string;
    public isHidden:boolean;
    public parent:TerraBreadcrumb;

    constructor(name:string, parent:TerraBreadcrumb, routerLink:string)
    {
        this.name = name;
        this.parent = parent;
        this.routerLink = routerLink;
        this.isHidden = false;
    }
}
