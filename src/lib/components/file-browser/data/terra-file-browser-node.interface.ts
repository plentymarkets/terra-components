export interface TerraFileBrowserNode {
    key: string;
    name: string;
    parentKey: string;
    icon?: string;
    onClick?: () => void;
    children?: Array<TerraFileBrowserNode>;
}
