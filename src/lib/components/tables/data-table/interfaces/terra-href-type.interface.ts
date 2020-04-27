import { TerraHrefTypeEnum } from '../enums/terra-href-type.enum';

export interface TerraHrefTypeInterface {
  type: TerraHrefTypeEnum;
  value: string | number | Function;
  caption?: any;
  target?: string;
}
