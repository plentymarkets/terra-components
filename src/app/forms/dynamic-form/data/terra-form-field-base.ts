import { isNull } from 'util';

/**
 * @author mfrank
 */
export interface TerraFormFieldBaseOptions<T>
{
    id?:number;
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
    id?:number;
    value:T;
    key:string;
    label:string;

    // Validator
    required:boolean;
    minLength:number;
    maxlength:number;
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

        this.id = options.id;
        this.key = key;
        this.controlType = controlType;

        this.value = options.value;
        this.label = options.label;

        this.required = !!options.required;
        this.minLength = options.minLength || -1;
        this.maxlength = options.maxLength || -1;
        this.minValue = options.minValue || null;
        this.maxValue = options.maxValue || null;
        this.pattern = options.pattern || '';
    }
}
