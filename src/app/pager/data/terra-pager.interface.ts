export interface TerraPagerInterface
{
    page:number;
    totalsCount:number;
    isLastPage:boolean;
    lastPageNumber:number;
    firstOnPage:number;
    lastOnPage:number;
    itemsPerPage:number;
    pagingUnit?:string; //Label for pager items
}
