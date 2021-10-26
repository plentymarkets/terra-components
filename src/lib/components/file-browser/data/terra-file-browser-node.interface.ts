export interface TerraFileBrowserNode {
    key: string;
    name: string;
    icon?: string;
    onClick?: () => void;
    children?: Array<TerraFileBrowserNode>;
}
