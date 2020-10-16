import { TerraHrefTypeEnum } from '../enums/terra-href-type.enum';

/** @deprecated since v5.0. Please use mat-table instead */
export interface TerraHrefTypeInterface {
    type: TerraHrefTypeEnum;
    value: string | number | Function;
    caption?: any;
    target?: string;
}
