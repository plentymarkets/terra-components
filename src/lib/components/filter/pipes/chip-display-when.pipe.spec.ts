import { ChipDisplayWhenPipe } from './chip-display-when.pipe';
import { DisplayWhenFn } from '../models/display-when-function.interface';

describe('ChipDisplayWhenPipe', () => {
    const pipe: ChipDisplayWhenPipe = new ChipDisplayWhenPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should show a chip by default only when the value is not null or undefined', () => {
        expect(pipe.transform(null)).toBe(false);
        expect(pipe.transform(undefined)).toBe(false);
        expect(pipe.transform(0)).toBe(true);
        expect(pipe.transform(NaN)).toBe(true);
        expect(pipe.transform(false)).toBe(true);
        expect(pipe.transform(true)).toBe(true);
    });

    it('should display a chip according the given `displayWhen` function when one is given', () => {
        const displayNever: DisplayWhenFn = (value: any) => false;
        expect(pipe.transform(1, displayNever)).toBe(false);
        expect(pipe.transform(true, displayNever)).toBe(false);
        expect(pipe.transform({}, displayNever)).toBe(false);

        const displayAlways: DisplayWhenFn = (value: any) => true;
        expect(pipe.transform(null, displayAlways)).toBe(true);
        expect(pipe.transform(undefined, displayAlways)).toBe(true);
        expect(pipe.transform(NaN, displayAlways)).toBe(true);
    });
});
