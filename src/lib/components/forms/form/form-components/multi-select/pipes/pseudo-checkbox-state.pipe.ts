import { Pipe, PipeTransform } from '@angular/core';
import { MatOption, MatPseudoCheckboxState } from '@angular/material/core';

/**
 * Evaluates the state of a PseudoCheckbox by comparing a list of selected options with the total list of options.
 * When no options are selected, 'unchecked' is returned.
 * When more than one, but not all options are selected, 'indeterminate' is returned.
 * When all options are selected, 'checked' is returned.
 */
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
