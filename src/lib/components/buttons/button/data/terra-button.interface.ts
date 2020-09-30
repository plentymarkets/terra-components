/**
 * @author mkunze
 *
 * Please use this only for rendering content in ngFor. See {@link TerraDataTableComponent}
 */
export interface TerraButtonInterface {
    icon?: string;
    iconColor?: string; // Only used in terra-button-with-options
    caption?: string;
    tooltipText?: string;
    clickFunction: (event?: Event) => void;
    tooltipPlacement?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    isHidden?: boolean;
    isDivider?: boolean;
    isHighlighted?: boolean;
    isSmall?: boolean;
    isLarge?: boolean;
    isFlagged?: boolean;
}
