import { TerraRouteIcon } from '../../../types/terra-route-icon.type';

/**
 * @author mkunze
 * @deprecated since v5. Use mat-tree instead.
 */

export interface TerraLeafInterface {
    caption: string;
    isOpen?: boolean;
    avoidOpenOnClick?: boolean;
    icon?: TerraRouteIcon;
    iconColor?: string;
    id?: number | string;
    isActive?: boolean;
    clickFunction?: () => void;
    onOpenFunction?: () => void;
    isOnOpenFunctionCalled?: boolean;
    contextMenu?: Array<any>; // TODO
    subLeafList?: Array<TerraLeafInterface>;
    parentLeafList?: Array<TerraLeafInterface>;
    value?: any; // for checkbox-tree
}
