import { FormControl } from '@angular/forms';

/**
 * @author mfrank
 */
export class TerraFormGroupHelper
{
    formFieldsToGroup:{ [key:string]:FormControl };
    defaultValues:{ [key:string]:string | number | boolean };
    translationMapping:{ [key:string]:string };

    constructor()
    {
        this.formFieldsToGroup = {};
        this.defaultValues = {};
        this.translationMapping = {};
    }
}