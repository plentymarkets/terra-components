import { Component, Inject, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { noop } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectInterface } from './multi-select.interface';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'tc-multi-select',
    templateUrl: './multi-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MultiSelectComponent,
            multi: true
        }
    ]
})
export class MultiSelectComponent implements ControlValueAccessor, MultiSelectInterface {
    /** The name of the control which will be used as label. */
    @Input()
    public name: string = '';

    /** Disables the select when set to true. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** Requires the select to be filled when set to true. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** Text that should be shown in a tooltip on the control. */
    @Input()
    public tooltipText: string = '';

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** List of options that the user can select from. */
    @Input()
    public checkboxValues: Array<{ caption: string; value: any }> = [];

    /** Internal model. Stores the value of the selected option. */
    public value: Array<any>;

    /** Current language to be used to translate any labels. */
    public _lang: string;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: Array<any>) => void = noop;

    constructor(@Inject(L10N_LOCALE) locale: L10nLocale) {
        this._lang = locale.language;
    }

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: Array<any>) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the select element. */
    public writeValue(value: Array<any>): void {
        this.value = value;
    }

    /**
     * Calls registered {@link _onChangeCallback} whenever the user has changed selections.
     * Passes `null` instead of an empty array to the change callback if there's nothing selected.
     */
    public _onChange(value: Array<any>): void {
        this._onChangeCallback(value.length === 0 ? null : value);
    }

    /**
     * Selects/deselects all options depending on whether all options are selected.
     * If all options are selected, they'll be unselected afterwards. Otherwise all options will be selected.
     * @param select
     */
    public _toggleAll(select: MatSelect): void {
        this.value =
            (select.selected as Array<MatOption>).length === this.checkboxValues.length
                ? []
                : this.checkboxValues.map(({ value }: { caption: string; value: any }) => value);
        this._onChange(this.value);
    }
}
