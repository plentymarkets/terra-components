export interface TerraPaginatedResultInterface<T>
{
    entries:Array<T>;
    page:number;
    itemPerPage:number;
    isFirstPage:boolean;
    isLastPage:boolean;
    firstOnPage:number;
    lastOnPage:number;
    totalsCount:number;
}