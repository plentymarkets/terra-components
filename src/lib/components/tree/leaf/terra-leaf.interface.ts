/**
 * @author mkunze
 */
export interface TerraLeafInterface {
    caption: string;
    isOpen?: boolean;
    avoidOpenOnClick?: boolean;
    icon?: string;
    iconColor?: string;
    id?: number | string;
    isActive?: boolean;
    clickFunction?: () => void;
    onOpenFunction?: () => void;
    isOnOpenFunctionCalled?: boolean;
    contextMenu?: Array<unknown>; // TODO
    subLeafList?: Array<TerraLeafInterface>;
    parentLeafList?: Array<TerraLeafInterface>;
    value?: unknown; // for checkbox-tree
}
