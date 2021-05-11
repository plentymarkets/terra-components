import { TerraKeyValueInterface } from '../../../../models';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

export const numberControl: TerraFormFieldInterface = {
    type: 'number',
    defaultValue: 2,
    options: {
        name: 'Number',
        required: false
    }
};

export const select: TerraFormFieldInterface = {
    type: 'select',
    defaultValue: 'option2',
    options: {
        required: true,
        name: 'Select',
        listBoxValues: [
            {
                value: 'option2',
                caption: 'Option 2',
                position: 2
            },
            {
                value: 'option1',
                caption: 'Option 1',
                position: 1,
                color: 'green'
            }
        ]
    }
};

export const suggestion: TerraFormFieldInterface = {
    type: 'suggestion',
    options: {
        name: 'Suggestion',
        required: false,
        listBoxValues: [
            {
                value: 'suggestion1',
                caption: 'Suggestion 1'
            },
            {
                value: 'suggestion2',
                caption: 'Suggestion 2'
            }
        ]
    }
};

export const listWithChildren: TerraFormFieldInterface = {
    type: 'horizontal',
    isList: '[2,]',
    defaultValue: {
        childSelect: select.options.listBoxValues[0].value,
        childText: 'Placeholder',
        childNumber: 123456789
    },
    // defaultValue: [{childSelect: 'option1', childNumber: 3}, {childSelect: 'option2', childText: 'Hallo'}],
    options: {
        name: 'Vertical'
    },
    children: {
        id: {
            type: 'number',
            isVisible: false,
            defaultValue: 0,
            options: {
                name: 'Id'
            }
        },
        childSelect: select,
        childText: {
            type: 'text',
            isVisible: '$listWithChildren.childSelect === "option2"',
            defaultValue: '',
            options: {
                name: 'Text',
                required: false
            }
        },
        childNumber: numberControl
    }
};

export const containerComponent: TerraFormFieldInterface = {
    type: 'portlet',
    options: {
        name: 'Portlet'
    },
    children: {
        childSelect: select,
        childText: {
            type: 'text',
            isVisible: 'wrappedContainer.childSelect === "option2"',
            defaultValue: '',
            options: {
                name: 'Text',
                required: false
            }
        },
        childNumber: numberControl
    }
};

export const formFields: TerraKeyValueInterface<TerraFormFieldInterface> = {
    checkbox: {
        type: 'checkbox',
        options: {
            name: 'checkbox',
            required: true
        }
    },
    textarea: {
        type: 'textarea',
        options: {
            name: 'Textarea',
            required: true,
            maxRows: 2
        }
    },
    text: {
        type: 'text',
        options: {
            name: 'Text',
            required: true
        }
    },
    color: {
        type: 'color',
        options: {
            name: 'Color',
            required: true
        }
    },
    optionalText: {
        type: 'text',
        isVisible: 'text.length > 3',
        options: {
            name: 'Optional text',
            required: true,
            minLength: 3
        }
    },
    checkboxGroup: {
        type: 'checkboxGroup',
        options: {
            name: 'multiselect',
            required: true,
            checkboxValues: [
                {
                    caption: 'Checkbox A',
                    value: 42
                },
                {
                    caption: 'Checkbox B',
                    value: 'Hello'
                },
                {
                    caption: 'Checkbox C',
                    value: 'World'
                }
            ]
        }
    },
    date: {
        type: 'date',
        defaultValue: '2019-01-01T00:00:00+01:00',
        options: {
            name: 'Test date',
            displayDateFormat: 'DD.MM.YYYY'
        }
    },
    listWithChildren: listWithChildren,
    wrappedContainer: containerComponent
};
