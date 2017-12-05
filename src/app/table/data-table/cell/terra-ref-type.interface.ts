
export enum TerraRefTypeEnum
{
    email = 'mailto',
    phone = 'tel'
}

export interface TerraRefTypeInterface
{
    type: TerraRefTypeEnum,
    value: string
}