import { AllowedColors } from './allowed.colors.enum';

/** @deprecated since v5. */
export interface TerraSelectBoxValueInterface {
    value: any;
    caption: string | number;
    icon?: string;
    position?: number;
    color?: AllowedColors;
}
