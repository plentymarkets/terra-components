import { TickIntervalPipe } from './tick-interval.pipe';

describe('TickIntervalPipe', () => {
    const pipe: TickIntervalPipe = new TickIntervalPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return 1 when showTicks is true and any valid interval (>0) is given', () => {
        expect(pipe.transform(true, 1)).toEqual(1);
    });

    it(`should return 'auto' if the interval is undefined`, () => {
        expect(pipe.transform(true, undefined)).toEqual('auto');
    });

    it('should return 0 if showTicks is false and the interval is undefined', () => {
        expect(pipe.transform(false, undefined)).toEqual(0);
    });

    it('should return 0 if showTicks is false, but the interval is given', () => {
        expect(pipe.transform(false, 1)).toEqual(0);
    });
});
