import { getNumberOfFractionalDigits } from './fractional-digits';

describe('getNumberOfFractionalDigits', () => {
    it('should return 0 if given number is undefined', () => {
        expect(getNumberOfFractionalDigits(undefined)).toEqual(0);
    });

    it('should return the number of fractional digits if a number is given', () => {
        expect(getNumberOfFractionalDigits(1223)).toEqual(0);
        expect(getNumberOfFractionalDigits(0.1)).toEqual(1);
        expect(getNumberOfFractionalDigits(12.132)).toEqual(3);
    });
});
