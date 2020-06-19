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
