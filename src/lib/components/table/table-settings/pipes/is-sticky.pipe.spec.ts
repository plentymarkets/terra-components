import { IsStickyPipe } from './is-sticky.pipe';

describe('IsStickyPipe', () => {
    it('create an instance', () => {
        const pipe: IsStickyPipe = new IsStickyPipe();
        expect(pipe).toBeTruthy();
    });
});
