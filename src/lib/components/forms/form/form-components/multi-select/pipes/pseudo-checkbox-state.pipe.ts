import { Pipe, PipeTransform } from '@angular/core';
import { MatOption, MatPseudoCheckboxState } from '@angular/material/core';

@Pipe({
    name: 'pseudoCheckboxState'
})
export class PseudoCheckboxStatePipe implements PipeTransform {
    public transform(
        selected: Array<MatOption> | MatOption,
        options: Array<{ caption: string; value: any }>
    ): MatPseudoCheckboxState {
        if (!Array.isArray(selected) || selected.length === 0) {
            return 'unchecked';
        }
        return selected.length === options.length ? 'checked' : 'indeterminate';
    }
}
