import { StringHelper } from '../string.helper';

describe('Helper: StringHelper', () =>
{
    let undefinedVariable:string;

    it('should return true', () =>
    {
        expect(StringHelper.isNullUndefinedOrEmpty(null)).toBe(true);
        expect(StringHelper.isNullUndefinedOrEmpty('')).toBe(true);
        expect(StringHelper.isNullUndefinedOrEmpty(undefinedVariable)).toBe(true);
    });

    it('should return false', () =>
    {
        expect(StringHelper.isNullUndefinedOrEmpty('randomstring')).toBe(false);
    });
});
