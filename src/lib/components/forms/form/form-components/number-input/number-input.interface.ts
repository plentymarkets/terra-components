import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';

export interface NumberInputInterface extends TerraFormComponentBaseInterface
{
    emptyMessage:string;
    invalidMessage:string;
    maxLength:number;
    maxValue:number;
    minLength:number;
    minValue:number;
}
