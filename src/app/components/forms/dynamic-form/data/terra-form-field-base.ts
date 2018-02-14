import { isNull } from 'util';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author mfrank
 */
export interface TerraFormFieldBaseOptions<T>
{
    value?:T;
    tooltip?:string;
    tooltipPlacement?:string;
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
    public value:T;
    public key:string;
    public label:string;

    // Tooltip
    public tooltip:string;
    public tooltipPlacement:string;

    // Validator
    public required:boolean;
    public minLength:number;
    public maxLength:number;
    public minValue:number;
    public maxValue:number;
    public pattern:string | RegExp;

    public readonly controlType:TerraControlTypeEnum;

    constructor(key:string, controlType:TerraControlTypeEnum, label:string, required:boolean, options:TerraFormFieldBaseOptions<T> = {})
    {
        if(isNull(key))
        {
            throw new Error('key can not be null');
        }

        if(isNull(controlType))
        {
            throw new Error('controlType can not be null');
        }

        this.key = key;
        this.controlType = controlType;

        this.label = label;
        this.required = required;

        this.value = options.value;
        this.tooltip = options.tooltip || null;
        this.tooltipPlacement = options.tooltipPlacement || 'top';
        this.minLength = options.minLength || -1;
        this.maxLength = options.maxLength || -1;
        this.minValue = options.minValue || null;
        this.maxValue = options.maxValue || null;
        this.pattern = options.pattern || '';
    }
}
