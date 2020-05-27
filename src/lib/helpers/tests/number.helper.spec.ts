import { NumberHelper } from '../number.helper';

describe('Helper: NumberHelper', () =>
{
    it('should round up a given number with different decimals', () =>
    {
        expect(NumberHelper.round(5.6, 0)).toEqual(6);
        expect(NumberHelper.round(5.67, 1)).toEqual(5.7);
        expect(NumberHelper.round(5.678, 2)).toEqual(5.68);
        expect(NumberHelper.round(5.6789, 3)).toEqual(5.679);

        expect(NumberHelper.round(-5.6, 0)).toEqual(-6);
        expect(NumberHelper.round(-5.67, 1)).toEqual(-5.7);
        expect(NumberHelper.round(-5.678, 2)).toEqual(-5.68);
    });

    it('should round down a given number with different decimals', () =>
    {
        expect(NumberHelper.round(5.4, 0)).toEqual(5);
        expect(NumberHelper.round(5.43, 1)).toEqual(5.4);
        expect(NumberHelper.round(5.432, 2)).toEqual(5.43);
        expect(NumberHelper.round(5.4321, 3)).toEqual(5.432);

        expect(NumberHelper.round(-5.4, 0)).toEqual(-5);
        expect(NumberHelper.round(-5.43, 1)).toEqual(-5.4);
        expect(NumberHelper.round(-5.432, 2)).toEqual(-5.43);
    });

    it('should round edge cases', () =>
    {
        expect(NumberHelper.round(5, 0)).toEqual(5);
        expect(NumberHelper.round(5, 30)).toEqual(5);
        expect(NumberHelper.round(5.00000, 5)).toEqual(5);
        expect(NumberHelper.round(5 + 1e-30, 0)).toEqual(5);
        expect(NumberHelper.round(5.5, 0)).toEqual(6);
        expect(NumberHelper.round(5.00001, 0)).toEqual(5);
        expect(NumberHelper.round(5.99999, 0)).toEqual(6);
        expect(NumberHelper.round(5.99999, 4)).toEqual(6);

        expect(NumberHelper.round(-5, 0)).toEqual(-5);
        expect(NumberHelper.round(-5, 30)).toEqual(-5);
        expect(NumberHelper.round(-5.5, 0)).toEqual(-5);
    });
});
