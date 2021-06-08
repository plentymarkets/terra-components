import { ChipDisplayValuePipe } from './chip-display-value.pipe';

describe('ChipDisplayValuePipe', () => {
    const pipe: ChipDisplayValuePipe = new ChipDisplayValuePipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return the given value as string if no displayWith function is given', () => {
        expect(pipe.transform(null)).toBe('null');
        expect(pipe.transform(undefined)).toBe('undefined');
        expect(pipe.transform(3)).toBe('3');
        expect(pipe.transform({})).toBe({}.toString());
    });

    it('should transform the value using the given displayWith function', () => {
        expect(pipe.transform(3, () => 'test')).toBe('test');
    });
});
