import { TerraKeyValueInterface } from '../../../../models';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

export const numberControl: TerraFormFieldInterface = {
    type: 'number',
    defaultValue: 10,
    options: {
        name: 'Number',
        required: false,
        minValue: 10,
        maxValue: 100
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
                value: null,
                caption: 'Option null',
                position: 3
            },
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
    defaultValue: 'suggestion1',
    options: {
        name: 'Suggestion',
        required: true,
        listBoxValues: [
            {
                value: 'suggestion1',
                caption: 'Hello',
                icon: 'icon-add'
            },
            {
                value: 2,
                caption: 'World',
                icon: 'icon-delete'
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
    suggestion: suggestion,
    double: {
        type: 'double',
        options: {
            name: 'double',
            isPriceInput: true
        }
    },
    checkbox: {
        type: 'checkbox',
        defaultValue: true,
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
    email: {
        type: 'text',
        options: {
            name: 'Email',
            email: true
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
    slider: {
        type: 'slider',
        options: {
            name: 'Slider',
            showMinMax: true,
            minValue: 0,
            maxValue: 1,
            interval: 0.1,
            showTicks: true,
            precision: 2
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
            displayDateFormat: 'DD.MM.YYYY',
            required: true
        }
    },
    listWithChildren: listWithChildren,
    wrappedContainer: containerComponent
};
