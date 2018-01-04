import { isNull } from 'util';

/**
 * @author mfrank
 */
export interface TerraFormFieldBaseOptions<T>
{
    value?:T,
    label?:string,
    required?:boolean
    minLength?:number;
    maxLength?:number;
    minValue?:number;
    maxValue?:number;
    pattern?:string | RegExp;
}

/**
 *
 */
export class TerraFormFieldBase<T>
{
    value:T;
    key:string;
    label:string;

    // Validator
    required:boolean;
    minLength:number;
    maxLength:number;
    minValue:number;
    maxValue:number;
    pattern:string | RegExp;

    readonly controlType:string;

    constructor(key:string, controlType:string, options:TerraFormFieldBaseOptions<T> = {})
    {
        if(isNull(key))
        {
            throw new Error('key can no tbe null');
        }

        if(isNull(controlType))
        {
            throw new Error('controlType can no tbe null');
        }

        this.key = key;
        this.controlType = controlType;

        this.value = options.value;
        this.label = options.label;

        this.required = !!options.required;
        this.minLength = options.minLength || -1;
        this.maxLength = options.maxLength || -1;
        this.minValue = options.minValue || null;
        this.maxValue = options.maxValue || null;
        this.pattern = options.pattern || '';
    }
}
