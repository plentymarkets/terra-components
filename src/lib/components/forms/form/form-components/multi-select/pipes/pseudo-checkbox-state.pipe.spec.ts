import { PseudoCheckboxStatePipe } from './pseudo-checkbox-state.pipe';
import { MatOption } from '@angular/material/core';

describe('PseudoCheckboxStatePipe', () => {
    const pipe: PseudoCheckboxStatePipe = new PseudoCheckboxStatePipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return `unchecked` when selected options is not an array', () => {
        expect(pipe.transform(null, [])).toBe('unchecked');
        expect(pipe.transform(undefined, [])).toBe('unchecked');
        expect(pipe.transform({} as MatOption, [])).toBe('unchecked');
    });

    it('should return `unchecked` when no option is selected', () => {
        expect(pipe.transform([], [{ caption: 'test', value: 'test' }])).toBe('unchecked');
    });

    it('should return `indeterminate` when any options but not all are selected', () => {
        const options: Array<{ caption: string; value: any }> = [
            { caption: '1', value: 1 },
            { caption: '2', value: 2 }
        ];
        expect(pipe.transform([{} as MatOption], options)).toBe('indeterminate');
    });

    it('should return `checked` when all options are selected', () => {
        const options: Array<{ caption: string; value: any }> = [
            { caption: '1', value: 1 },
            { caption: '2', value: 2 }
        ];
        expect(pipe.transform([{} as MatOption, {} as MatOption], options)).toBe('checked');
    });
});
