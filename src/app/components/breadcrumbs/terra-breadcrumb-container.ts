import { TerraBreadcrumb } from './terra-breadcrumb';

export class TerraBreadcrumbContainer
{
    public currentSelectedBreadcrumb:TerraBreadcrumb;
    public breadcrumbList:Array<TerraBreadcrumb>;
    public parameterisedRoute:string;
    public isHidden:boolean;

    constructor(parameterisedRoute:string)
    {
        this.parameterisedRoute = parameterisedRoute;

        this.breadcrumbList = [];
    }
}
