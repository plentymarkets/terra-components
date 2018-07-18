export class TerraBreadcrumb
{
    public name:string;
    public routerLink:string;
    public id:number;
    public isHidden:boolean;

    constructor(name:string, routerLink?:string, id?:number)
    {
        this.name = name;

        this.routerLink = routerLink;

        this.id = id;

        this.isHidden = false;
    }
}
