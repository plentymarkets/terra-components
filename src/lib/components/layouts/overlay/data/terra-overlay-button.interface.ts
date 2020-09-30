/**
 * @author mfrank
 */
export interface TerraOverlayButtonInterface {
    icon?: string;
    caption?: string;
    tooltipText?: string;
    isDisabled?: boolean;
    clickFunction: () => void;
}
