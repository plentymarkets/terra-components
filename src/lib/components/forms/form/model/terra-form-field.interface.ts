import { TerraFormFieldOptionInterface } from './terra-form-field-option.interface';

export interface TerraFormFieldInterface
{
    type:string;
    isList?:boolean | string;
    isVisible?:boolean | string;
    isValid?:string;
    defaultValue?:unknown;
    options?:TerraFormFieldOptionInterface;
    children?:{ [key:string]:TerraFormFieldInterface };
    width?:string;
}
