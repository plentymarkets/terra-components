import { StringHelper } from '../string.helper';

describe('StringHelper:', () => {
    it('Method: isNullUndefinedOrEmpty() should validate the variable', () => {
        let testVar: string = undefined;
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBeTrue();

        testVar = null;
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBeTrue();

        testVar = '';
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBeTrue();

        testVar = 'Test';
        expect(StringHelper.isNullUndefinedOrEmpty(testVar)).toBeFalse();
    });
});
