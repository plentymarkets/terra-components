/**
 * @author mkunze
 *
 * Please use this only for rendering content in ngFor. See {@link PlentyDataTableComponent}
 */
export interface PlentyButtonInterface
{
    icon?:string;
    caption?:string;
    tooltipText?:string;
    clickFunction:()=>void;
}
