export interface TerraPagerInterface<T>
{
    page:number;
    itemsPerPage:number;
    totalsCount?:number;
    isLastPage?:boolean;
    lastPageNumber?:number;
    firstOnPage?:number;
    lastOnPage?:number;
    pagingUnit?:string; //Label for pager items
    entries?:Array<T>;
}
