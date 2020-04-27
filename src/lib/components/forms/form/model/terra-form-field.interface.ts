export interface TerraFormFieldInterface {
  type: string;
  isList?: boolean | string;
  isVisible?: boolean | string;
  isValid?: string;
  defaultValue?: any;
  options?: { [key: string]: any };
  children?: { [key: string]: TerraFormFieldInterface };
  width?: string;
}
