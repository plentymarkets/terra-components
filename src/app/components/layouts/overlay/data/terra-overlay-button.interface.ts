/**
 * @author mfrank
 */
export interface TerraOverlayButtonInterface
{
    icon?:string;
    caption?:string;
    tooltipText?:string;
    isDisabled?:boolean;
    clickFunction:() => void;
    isPrimary?:boolean;
    isSecondary?:boolean;
    isTertiary?:boolean;
}
