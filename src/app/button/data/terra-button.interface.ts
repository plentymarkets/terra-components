/**
 * @author mkunze
 *
 * Please use this only for rendering content in ngFor. See {@link TerraDataTableComponent}
 */
export interface TerraButtonInterface
{
    icon?:string;
    caption?:string;
    tooltipText?:string;
    clickFunction:() => void;
    tooltipPlacement?:string;
    isPrimary?:boolean;
    isSecondary?:boolean;
    isActive?:boolean;
    isDisabled?:boolean;
    isHidden?:boolean;
}
