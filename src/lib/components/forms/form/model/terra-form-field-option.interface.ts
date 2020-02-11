export interface TerraFormFieldOptionInterface
{
    minLength?:number;
    maxLength?:number;
    minValue?:number;
    maxValue?:number;
    pattern?:string | RegExp;
    email?:boolean;
    iban?:boolean;
    isIban?:boolean;
    required?:boolean;
    uniqueValues?:Array<string>;
    [key:string]:unknown;
}
