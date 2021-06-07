import { ChipDisplayValuePipe } from './chip-display-value.pipe';

describe('ChipDisplayValuePipe', () => {
    const pipe: ChipDisplayValuePipe = new ChipDisplayValuePipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return the given value as string if no displayWith function is given', () => {
        const value: any = 3;
        expect(pipe.transform(value, null)).toBe(value.toString());
    });

    it('should transform the value using the given displayWith function', () => {
        expect(pipe.transform(3, () => 'test')).toBe('test');
    });
});
