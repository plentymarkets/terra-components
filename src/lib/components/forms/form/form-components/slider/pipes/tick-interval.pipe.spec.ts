import { TickIntervalPipe } from './tick-interval.pipe';

describe('TickIntervalPipe', () => {
    const pipe: TickIntervalPipe = new TickIntervalPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return 1 when showTicks is true and any valid interval (>0) is given', () => {
        expect(pipe.transform(true, 1)).toEqual(1);
        expect(pipe.transform(true, 2)).toEqual(1);
    });

    it(`should return 'auto' if the interval is 0, null or undefined`, () => {
        expect(pipe.transform(true, 0)).toEqual('auto');
        expect(pipe.transform(true, null)).toEqual('auto');
        expect(pipe.transform(true, undefined)).toEqual('auto');
    });

    it('should return 0 if showTicks is false no matter what interval is given', () => {
        expect(pipe.transform(false, undefined)).toEqual(0);
        expect(pipe.transform(false, 0)).toEqual(0);
        expect(pipe.transform(false, 2)).toEqual(0);
    });
});
