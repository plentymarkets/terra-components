export enum TerraRefTypeEnum {
    email = 'mailto',
    phone = 'tel',
    url = 'url',
    fct = 'fct'
}

export interface TerraRefTypeInterface {
    type: TerraRefTypeEnum,
    value: any,
    caption?: any,
    target?: string,
}
