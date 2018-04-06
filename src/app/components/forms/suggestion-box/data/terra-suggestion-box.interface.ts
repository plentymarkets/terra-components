import { TerraBaseData } from '../../../data/terra-base.data';

export interface TerraSuggestionBoxValueInterface
{
    value:number | string | TerraBaseData;
    // i18n from locale_de and locale_en
    caption:string;
    icon?:string;
    active?:boolean;
}
