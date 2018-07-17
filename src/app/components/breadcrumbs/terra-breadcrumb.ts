export class TerraBreadcrumb
{
    public name:string;
    public routerLink:string;
    public parameterisedRoute:string;
    public id:number;

    constructor(name:string, parameterisedRoute:string, routerLink?:string, id?:number)
    {
        this.name = name;

        this.routerLink = routerLink;

        this.parameterisedRoute = parameterisedRoute;

        this.id = id;
    }
}
