import { TerraKeyValueInterface } from '../../../../models/terra-key-value.interface';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

export const numberControl:TerraFormFieldInterface = {
    type:         'number',
    defaultValue: 2,
    options:      {
        name:        'Number',
        required:     false
    }
};

export const select:TerraFormFieldInterface = {
    type:         'select',
    defaultValue: 'option2',
    options:      {
        required:      true,
        name:          'Select',
        listBoxValues: [
            {
                value:    'option1',
                caption:  'Option 1',
                position: 0
            },
            {
                value:    'option2',
                caption:  'Option 2',
                position: 1
            }
        ]
    }
};

export const listWithChildren:TerraFormFieldInterface = {
    type:     'vertical',
    isList:   '[2,]',
    defaultValue: {
        childSelect: select.options.listBoxValues[0].value,
        childText: 'Placeholder',
        childNumber: 123456789
    },
    options:  {
        name: 'Vertical'
    },
    children: {
        childSelect: select,
        childText:          {
            type:         'text',
            isVisible:    '$listWithChildren.childSelect === "option2"',
            defaultValue: '',
            options:      {
                name:        'Text',
                required:    false
            }
        },
        childNumber: numberControl,
    }
};

export const formFields:TerraKeyValueInterface<TerraFormFieldInterface> = {
    listWithChildren: listWithChildren
};

