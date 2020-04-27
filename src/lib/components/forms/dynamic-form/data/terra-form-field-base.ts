import { isNull } from 'util';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraFormFieldBaseOptions<T> {
  defaultValue?: T;
  tooltip?: string;
  tooltipPlacement?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string | RegExp;
  isHidden?: boolean;
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export class TerraFormFieldBase<T> {
  public defaultValue: T;
  public key: string;
  public label: string;
  public isHidden: boolean;

  // Tooltip
  public tooltip: string;
  public tooltipPlacement: string;

  // Validator
  public required: boolean;
  public minLength: number;
  public maxLength: number;
  public minValue: number;
  public maxValue: number;
  public pattern: string | RegExp;

  public readonly controlType: TerraControlTypeEnum;

  constructor(
    key: string,
    controlType: TerraControlTypeEnum,
    label: string,
    required: boolean,
    options: TerraFormFieldBaseOptions<T> = {}
  ) {
    if (isNull(key)) {
      throw new Error('key can not be null');
    }

    if (isNull(controlType)) {
      throw new Error('controlType can not be null');
    }

    this.key = key;
    this.controlType = controlType;

    this.label = label;
    this.required = required;
    this.isHidden = options.isHidden || false;

    this.defaultValue = options.defaultValue || null;
    this.tooltip = options.tooltip || null;
    this.tooltipPlacement = options.tooltipPlacement || 'top';
    this.minLength = options.minLength || -1;
    this.maxLength = options.maxLength || -1;
    this.minValue = options.minValue || null;
    this.maxValue = options.maxValue || null;
    this.pattern = options.pattern || '';
  }
}
