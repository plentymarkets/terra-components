import { Component, Inject, Input, OnInit } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { merge, noop, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SuggestionInterface } from './suggestion.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

/** A type guard to check whether the given value is of the type {@link TerraSuggestionBoxValueInterface}. */
export function isSuggestionValue(value: unknown): value is TerraSuggestionBoxValueInterface {
    return value && typeof value === 'object' && 'caption' in value && 'value' in value;
}

@Component({
    selector: 'tc-suggestion',
    templateUrl: './suggestion.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SuggestionComponent,
            multi: true
        }
    ]
})
export class SuggestionComponent implements ControlValueAccessor, SuggestionInterface, OnInit {
    /** Set the label. */
    @Input()
    public name: string = '';

    /** If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** If true, the autocomplete-input will be disabled. Default false. */
    @Input()
    public set isDisabled(disabled: boolean) {
        disabled ? this._control.disable() : this._control.enable();
    }

    /** Set the tooltip. */
    @Input()
    public tooltipText: string = '';

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** A list of options that the user can select from the suggestion box. */
    @Input()
    public listBoxValues: Array<TerraSuggestionBoxValueInterface> = [];

    /** A formControl for the handling of the value. */
    public _control: FormControl = new FormControl();
    /** An observable list of suggestions. The list will be updated whenever the user types in the input. */
    public _filteredOptions: Observable<Array<TerraSuggestionBoxValueInterface>>;

    /** A subject which emits whenever the panel is opened. */
    public _autoCompleteOpened: Subject<void> = new Subject();

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    /** Formats the value to be displayed. */
    public _displayFn: (value: TerraSuggestionBoxValueInterface) => string = (
        value: TerraSuggestionBoxValueInterface
    ) => value?.caption;

    public ngOnInit(): void {
        const filteredOptions$: Observable<Array<TerraSuggestionBoxValueInterface>> = this._control.valueChanges.pipe(
            startWith(this._control.value ?? ''),
            map((value: TerraSuggestionBoxValueInterface | string) =>
                isSuggestionValue(value) ? value.caption : value
            ),
            map((caption: string) => this._filter(caption ?? ''))
        );

        // get the full list of listBoxValues if an option is selected and the panel is opened.
        // if the value changes in the input the filter takes effect again
        this._filteredOptions = merge(
            filteredOptions$,
            this._autoCompleteOpened.pipe(map(() => this.listBoxValues.slice()))
        );
    }

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: any): void {
        const selectedValue: TerraSuggestionBoxValueInterface | undefined = this.listBoxValues.find(
            (v: TerraSuggestionBoxValueInterface) => v.value === value
        );
        this._control.setValue(selectedValue);
    }

    /** Calls the onChangeCallback whenever the user selects a new option. */
    public _optionSelected(event: MatAutocompleteSelectedEvent): void {
        const selectedValue: TerraSuggestionBoxValueInterface = event.option.value;
        this._onChangeCallback(selectedValue.value);
    }

    /** A function to filter the listBoxValues depending on the value in the autocomplete-input. */
    private _filter(value: string): Array<TerraSuggestionBoxValueInterface> {
        const filterValue: string = value.toLowerCase();

        return this.listBoxValues.filter((option: TerraSuggestionBoxValueInterface) =>
            option.caption.toLowerCase().includes(filterValue)
        );
    }
}
