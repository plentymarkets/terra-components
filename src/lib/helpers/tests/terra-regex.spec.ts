import { TerraRegex } from '..';

describe('TerraRegex: COLOR_HEX', () =>
{
    let regEx:RegExp;
    beforeAll(() =>
        {
            regEx = new RegExp(TerraRegex.COLOR_HEX);
        }
    );
    it('should check an uppercase and lowercase hexadecimal pattern', () =>
    {
        expect(regEx.test('#FF33CC')).toBe(true);
        expect(regEx.test('#ff33cc')).toBe(true);
        expect(regEx.test('#123456')).toBe(true);
    });

    it('should check a pattern with 3 tokens', () =>
    {
        expect(regEx.test('#F3C')).toBe(true);
        expect(regEx.test('#123')).toBe(true);
    });

    it('should return false when pattern is no valid hexadecimal color', () =>
    {
        expect(regEx.test('#FG33CC')).toBe(false);
        expect(regEx.test('#F33CC')).toBe(false);
        expect(regEx.test('FF33CC')).toBe(false);
    });
});

describe('TerraRegex: NUMERIC', () =>
{
    let regEx:RegExp;
    beforeAll(() =>
        {
            regEx = new RegExp(TerraRegex.NUMERIC);
        }
    );
    it('should return true for different numeric values', () =>
    {
        expect(regEx.test('0')).toBe(true);
        expect(regEx.test('-3')).toBe(true);
        expect(regEx.test('3')).toBe(true);
        expect(regEx.test('123456')).toBe(true);
    });

    it('should return false for values with exponent', () =>
    {
        expect(regEx.test('3e30')).toBe(false);
    });

    it('should return false for rational numeric values', () =>
    {
        expect(regEx.test('3.4')).toBe(false);
        expect(regEx.test('3,4')).toBe(false);
    });
});
