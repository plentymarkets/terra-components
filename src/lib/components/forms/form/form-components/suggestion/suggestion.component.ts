import { Component, Input, OnInit } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { noop, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'tc-suggestion',
    templateUrl: './suggestion.component.html'
})
export class SuggestionComponent implements OnInit {
    /** Set the label. */
    @Input()
    public name: string;

    /** If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean;

    /** If true, the autocomplete-input will be disabled. Default false. */
    @Input()
    public isDisabled: boolean;

    /** Set the tooltip. */
    @Input()
    public tooltipText: string;

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    @Input()
    public listBoxValues: Array<TerraSuggestionBoxValueInterface> = [];

    /** Internal model. Stores the value of the selected option. */
    public value: any;
    /** A formControl to listen on value changes in the autocomplete-input. */
    public control: FormControl = new FormControl();
    /** An observable of an array to map the filtered values. */
    public filteredOptions: Observable<Array<TerraSuggestionBoxValueInterface>>;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    public ngOnInit(): void {
        this.filteredOptions = this.control.valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filter(value))
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
        this.value = value;
    }

    /** The function to filter through the listBoxValues depending on the value in the autocomplete-input. */
    private _filter(value: any): Array<TerraSuggestionBoxValueInterface> {
        const filterValue: any = value.toLowerCase();

        return this.listBoxValues.filter((option: any) => option.caption.toLowerCase().indexOf(filterValue) === 0);
    }
}
