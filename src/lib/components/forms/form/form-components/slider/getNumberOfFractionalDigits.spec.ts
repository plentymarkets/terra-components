import { getNumberOfFractionalDigits } from './getNumberOfFractionalDigits';

describe('getNumberOfFractionalDigits', () => {
    it('should return 0 if the precision is undefined', () => {
        expect(getNumberOfFractionalDigits(undefined)).toEqual(0);
    });

    it('should return the number of fractional digits if an interval is set to 0.1', () => {
        expect(getNumberOfFractionalDigits(0.1)).toEqual(1);
    });
});
