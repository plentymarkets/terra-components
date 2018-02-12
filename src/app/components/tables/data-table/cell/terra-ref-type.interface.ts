export enum TerraRefTypeEnum {
    email = 'mailto',
    phone = 'tel',
    url = 'url',
    function = 'function'
}

export interface TerraRefTypeInterface {
    type: TerraRefTypeEnum;
    value: string|number|Function;
    caption?: any;
    target?: string;
}
