/**
 * @author mfrank
 */
export interface TerraPagerInterface
{
    pagingUnit:string;
    total:number;
    currentPage:number;
    perPage:number;
    lastPage:number;
    from:number;
    to:number;
}
