import { StringHelper } from '../string.helper';

describe('StringHelper:', () =>
{
    it('Method: isNullUndefinedOrEmpty() should validate the variable', () =>
    {
        // undefined
        let testVar:string = undefined;
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBe(true);

        // null
        testVar = null;
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBe(true);

        // empty
        testVar = '';
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBe(true);

        testVar = 'Test';

        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBe(false);
    });
});
