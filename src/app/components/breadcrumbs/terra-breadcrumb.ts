export class TerraBreadcrumb
{
    public name:string;
    public routerLink:string;
    public onClick:() => void;
    public parameterisedRoute:string;
    public id:number;

    constructor(name:string, parameterisedRoute:string, routerLink?:string, id?:number, onClick?:() => void)
    {
        this.name = name;

        this.routerLink = routerLink;

        this.onClick = onClick;

        this.parameterisedRoute = parameterisedRoute;

        this.id = id;
    }
}
