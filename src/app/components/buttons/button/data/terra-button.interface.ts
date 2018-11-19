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
    clickFunction:(event?:Event) => void;
    tooltipPlacement?:string;

    /**
     * @deprecated The button color depends on the input icon. Each icon has its own fixed color.
     */
    isPrimary?:boolean;

    /**
     * @deprecated The button color depends on the input icon. Each icon has its own fixed color.
     */
    isSecondary?:boolean;

    /**
     * @deprecated The button color depends on the input icon. Each icon has its own fixed color.
     */
    isTertiary?:boolean;
    isActive?:boolean;
    isDisabled?:boolean;
    isHidden?:boolean;
    isDivider?:boolean;
    isHighlighted?:boolean;
    isSmall?:boolean;
    isLarge?:boolean;
    isFlagged?:boolean;
}
