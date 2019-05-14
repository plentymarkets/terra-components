import { TerraKeyValueInterface } from '../../../../models/terra-key-value.interface';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

export const formFields:TerraKeyValueInterface<TerraFormFieldInterface> = {
    listWithChildren: {
        type:     'vertical',
        isList:   '[2,]',
        defaultValue: {
            childSelect: 'option1',
            childText: 'Placeholder',
            childNumber: 123456789
        },
        options:  {
            name: 'Vertical'
        },
        children: {
            childSelect:     {
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
            },
            childText:          {
                type:         'text',
                isVisible:    '$listWithChildren.childSelect === "option2"',
                defaultValue: '',
                options:      {
                    name:        'Text',
                    required:    false
                }
            },
            childNumber: {
                type:         'number',
                defaultValue: '',
                options:      {
                    name:        'Number',
                    required:     false
                }
            }
        }
    }
};
