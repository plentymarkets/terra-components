import { isRootWindow } from './window';

describe('window utility', () => {
    describe('isRootWindow:', () => {
        // INFO: Those tests run in an iframe
        it('should return true if the given window is the root one', () => {
            expect(isRootWindow(window.parent)).toBe(true);
        });

        it('should return false if the given window is not the root', () => {
            expect(isRootWindow(window)).toBe(false);
        });
    });
});
