import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

export interface SliderInterface extends TerraFormComponentBaseInterface {
    min: number;
    max: number;
    interval: number;
    precision: number;
    showMinMax: boolean;
    showTicks: boolean;
}
