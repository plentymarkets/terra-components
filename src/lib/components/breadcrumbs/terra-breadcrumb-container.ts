import { TerraBreadcrumb } from './terra-breadcrumb';

export class TerraBreadcrumbContainer {
    public currentSelectedBreadcrumb: TerraBreadcrumb;
    public breadcrumbList: Array<TerraBreadcrumb>;
    public isHidden: boolean;

    constructor() {
        this.breadcrumbList = [];
    }

    public get visibleBreadcrumbsCount(): number {
        return this.breadcrumbList.filter((bc: TerraBreadcrumb) => !bc.isHidden).length;
    }
}
