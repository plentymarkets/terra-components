import { TerraFormFieldInterface } from '../../../../..';

describe(`TerraFormHelper:`, () =>
    {
        const child1:TerraFormFieldInterface = {type: 'text', defaultValue: 'one'};
        const child2:TerraFormFieldInterface = {type: 'text', defaultValue: [1, 2]};

        const formFields:{ [key:string]:TerraFormFieldInterface } = {
            control1: {type: 'text', defaultValue: 'one'},
            control2: {type: 'text', defaultValue: 'two'},
            controlWithArray: {type: 'text', defaultValue: [1, 2]},
            controlWithObject: {type: 'text', defaultValue: {foo: 'bar'}},
            controlWithChildren: {type: 'horizontal', children: {child1: child1, child2: child2}},
            controlList: {type: 'number', isList: true, defaultValue: 5},
            controlListWithoutDefaultValue: {type: 'number', isList: true}
        };

        it('should', () =>
        {

        });
    }
)
