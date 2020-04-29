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
    contextMenu?: Array<any>; // TODO
    subLeafList?: Array<TerraLeafInterface>;
    parentLeafList?: Array<TerraLeafInterface>;
    value?: any; // for checkbox-tree
}
