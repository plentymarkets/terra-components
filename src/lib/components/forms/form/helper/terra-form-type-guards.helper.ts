import { ControlValueAccessor } from '@angular/forms';

export class TerraFormTypeGuardsHelper
{
    public static isControlValueAccessor(object:any):object is ControlValueAccessor
    {

        return 'writeValue' in object && 'registerOnChange' in object && 'registerOnTouched' in object;
    }

    public static hasIsValid(object:any):object is { isValid:boolean }
    {
        return 'isValid' in object;
    }
}
