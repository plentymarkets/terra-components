import {
    TERRA_FORM_PROPERTY_METADATA_KEY,
    TerraDynamicFormElementInterface
} from '../../../../../';
import 'reflect-metadata';
import { isNullOrUndefined } from 'util';

export class TerraFormFieldHelper
{
    public static extractFormFields(formModel:any):{ [key:string]:TerraDynamicFormElementInterface }
    {
        let formFields:{ [key:string]:TerraDynamicFormElementInterface }
            = Reflect.getMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, formModel.constructor);

        if(!isNullOrUndefined(formFields))
        {
            Object.keys(formFields)
                  .forEach((formFieldProperty:string) =>
                  {
                      let formField:TerraDynamicFormElementInterface = formFields[formFieldProperty];
                      if(isNullOrUndefined(formField.isList))
                      {
                          formField.isList = Reflect.getMetadata('design:type', formModel.constructor, formFieldProperty) === Array;
                      }

                      if(!isNullOrUndefined(formModel[formFieldProperty])
                         && Reflect.hasMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, formModel[formFieldProperty].constructor))
                      {
                          formField.children = TerraFormFieldHelper.extractFormFields(formModel[formFieldProperty]);
                      }
                  });
        }
        console.log(formFields);
        return formFields;
    }
}
