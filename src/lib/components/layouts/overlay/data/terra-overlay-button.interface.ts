/**
 * @author mfrank
 * @deprecated since v5.
 */
export interface TerraOverlayButtonInterface {
    icon?: string;
    caption?: string;
    tooltipText?: string;
    isDisabled?: boolean;
    clickFunction: () => void;
}
