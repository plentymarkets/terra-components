import { TerraFormFieldInterface } from './terra-form-field.interface';
import 'reflect-metadata';

// Metadata key to get editor property data from
export const TERRA_FORM_PROPERTY_METADATA_KEY: string = 'TERRA_FORM_PROPERTY_METADATA_KEY';

/**
 * Make the annotated property editable in editor's sidebar.
 * @param propertyDescription   EditorPropertyInterface
 */
export function TerraFormProperty(propertyDescription?: TerraFormFieldInterface): PropertyDecorator {
    return (target: Object, propertyKey: string): void => {
        // Store property description in "global" metadata of object's constructor:
        // > 1. get previously defined properties
        let formFields: { [key: string]: TerraFormFieldInterface } =
            Reflect.getMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, target.constructor) || {};

        // > 2. add current property description
        formFields[propertyKey] = propertyDescription;

        // > 3. set property descriptions
        Reflect.defineMetadata(TERRA_FORM_PROPERTY_METADATA_KEY, formFields, target.constructor);

        // store type information of current property
        Reflect.defineMetadata(
            'design:type',
            Reflect.getMetadata('design:type', target, propertyKey),
            target.constructor,
            propertyKey
        );
    };
}
