import { TimeDigitPipe } from './time-digit.pipe';

describe('TimeDigitPipe', () =>
{
    const pipe:TimeDigitPipe = new TimeDigitPipe();

    it('should create', () =>
    {
        expect(pipe).toBeTruthy();
    });

    it('should prepend a "0" if the value has only one digit', () =>
    {
        for(let i:number = 0; i < 10; i++)
        {
            expect(pipe.transform(i).startsWith('0')).toBe(true);
        }
    });
});
