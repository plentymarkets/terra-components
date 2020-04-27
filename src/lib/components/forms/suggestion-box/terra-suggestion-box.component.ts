import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from './data/terra-suggestion-box.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNull, isNullOrUndefined } from 'util';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import { TerraBaseData } from '../../data/terra-base.data';
import { noop } from 'rxjs';
import { Language } from 'angular-l10n';

const MAX_LASTLY_USED_ENTRIES: number = 5;

@Component({
  selector: 'terra-suggestion-box',
  styleUrls: ['./terra-suggestion-box.component.scss'],
  templateUrl: './terra-suggestion-box.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TerraSuggestionBoxComponent,
      multi: true
    }
  ]
})
export class TerraSuggestionBoxComponent
  implements OnInit, OnChanges, ControlValueAccessor, OnDestroy {
  @Input()
  public inputName: string;

  @Input()
  public inputIsRequired: boolean;

  @Input()
  public inputIsDisabled: boolean;

  @Input()
  public inputTooltipText: string;

  @Input()
  public inputTooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

  @Input()
  public inputListBoxValues: Array<TerraSuggestionBoxValueInterface> = [];

  @Input()
  public inputWithRecentlyUsed: boolean;

  @Output()
  public outputClicked: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public textInputValueChange: EventEmitter<string> = new EventEmitter<string>();

  public isValid: boolean = true;

  @Language()
  public _lang: string;

  public _displayListBoxValues: Array<TerraSuggestionBoxValueInterface> = [];
  public _listBoxHeadingKey: string = '';
  public _noEntriesTextKey: string;
  public _selectedValue: TerraSuggestionBoxValueInterface = null;
  public _tmpSelectedValue: TerraSuggestionBoxValueInterface = null;
  public _toggleOpen: boolean = false;

  // tslint:disable-next-line:variable-name
  private __textInputValue: string = '';
  private _lastSelectedValues: Array<TerraSuggestionBoxValueInterface> = [];
  private _hasLabel: boolean;
  private _clickListener: (event: Event) => void;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @ViewChildren('renderedListBoxValues')
  private _renderedListBoxValues: QueryList<ElementRef>;

  constructor(private _elementRef: ElementRef) {}

  public ngOnInit(): void {
    this._clickListener = (event: Event): void => {
      this.clickedOutside(event);
    };

    this._hasLabel = !isNull(this.inputName);
    this._noEntriesTextKey = this.inputWithRecentlyUsed
      ? 'terraSuggestionBox.noRecentlyUsed'
      : 'terraSuggestionBox.noSuggestions';

    if (!this.inputWithRecentlyUsed) {
      // initialize the displayed list with all possible values
      this._displayListBoxValues = this.inputListBoxValues;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputListBoxValues']) {
      this._displayListBoxValues = this.inputListBoxValues;
      if (
        changes['inputListBoxValues'].currentValue.length > 0 &&
        !isNullOrUndefined(this.selectedValue) &&
        !this.inputListBoxValues.find(
          (x: TerraSuggestionBoxValueInterface): boolean => this.selectedValue.value === x.value
        )
      ) {
        // reset selected value if the value does not exists or the list is empty
        this.selectedValue = null;
      }
    }
  }

  public ngOnDestroy(): void {
    // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public get value(): number | string | TerraBaseData {
    return !isNullOrUndefined(this.selectedValue) ? this.selectedValue.value : null;
  }

  public set value(value: number | string | TerraBaseData) {
    if (isNullOrUndefined(this.inputListBoxValues) || isNullOrUndefined(value)) {
      this.selectedValue = null;
    } else {
      this.selectedValue = this.inputListBoxValues.find(
        (item: TerraSuggestionBoxValueInterface) => item.value === value
      );
    }

    this._tmpSelectedValue = this.selectedValue;
  }

  public set toggleOpen(value: boolean) {
    if (this._toggleOpen !== value && value === true) {
      document.addEventListener('click', this._clickListener, true);
      this.focusSelectedElement();
    } else if (this._toggleOpen !== value && value === false) {
      document.removeEventListener('click', this._clickListener);
    }
    this._toggleOpen = value;
  }

  public get toggleOpen(): boolean {
    return this._toggleOpen;
  }

  public _onChange(): void {
    let searchString: any = this._textInputValue;
    this.toggleOpen = true;

    if (!isNullOrUndefined(searchString) && searchString.length >= 3) {
      this._listBoxHeadingKey = 'terraSuggestionBox.suggestions';
      this._noEntriesTextKey = 'terraSuggestionBox.noSuggestions';
      if (!isNullOrUndefined(this.inputListBoxValues)) {
        this._displayListBoxValues = this.inputListBoxValues.filter(
          (value: TerraSuggestionBoxValueInterface) => {
            // check if search string has a full match
            if (value.caption.toUpperCase().includes(searchString.toUpperCase())) {
              return true;
            }

            // search for partial strings
            let searchStringIncluded: boolean = true;
            searchString.split(' ').forEach((word: string) => {
              searchStringIncluded =
                searchStringIncluded && value.caption.toUpperCase().includes(word.toUpperCase());
            });
            return searchStringIncluded;
          }
        );
      }
    } else if (this.inputWithRecentlyUsed) {
      this._listBoxHeadingKey = 'terraSuggestionBox.recentlyUsed';
      this._noEntriesTextKey = 'terraSuggestionBox.noRecentlyUsed';
      this._displayListBoxValues = this._lastSelectedValues;
    } else if (!isNullOrUndefined(this.inputListBoxValues)) {
      this._displayListBoxValues = this.inputListBoxValues;
    }

    // update selected value
    this.setSelectedValue(
      this._displayListBoxValues.find(
        (val: TerraSuggestionBoxValueInterface) => val.caption === searchString
      ),
      true
    );
  }

  public set selectedValue(value: TerraSuggestionBoxValueInterface) {
    this.setSelectedValue(value);
  }

  public get selectedValue(): TerraSuggestionBoxValueInterface {
    return this._selectedValue;
  }

  public _onClick(evt: Event): void {
    evt.stopPropagation(); // prevents the click listener on the document to be fired right after
    this.toggleOpen = !this.toggleOpen;
  }

  public _onKeyDown(event: KeyboardEvent): void {
    // check if one of the dedicated keys has been pressed
    if (
      !(
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'Enter' ||
        event.key === 'Escape'
      )
    ) {
      return;
    }

    // check if there is any selected value yet
    if (isNullOrUndefined(this._tmpSelectedValue)) {
      this._tmpSelectedValue = this._displayListBoxValues[0];
    } else {
      // get the array index of the selected value
      let index: number = this._displayListBoxValues.findIndex(
        (item: TerraSuggestionBoxValueInterface) => item.value === this._tmpSelectedValue.value
      );

      // check if element has been found
      if (index >= 0) {
        // determine the key, that has been pressed
        switch (event.key) {
          case 'ArrowDown': // mark the succeeding list element
            if (index + 1 < this._displayListBoxValues.length) {
              // open dropdown if not already opened
              if (!this.toggleOpen) {
                this.toggleOpen = true;
              }
              // mark next element for selection
              this._tmpSelectedValue = this._displayListBoxValues[index + 1];
              // adjust scrolling viewport
              this.focusSelectedElement();
            }
            break;
          case 'ArrowUp': // mark the preceding list element
            if (index - 1 >= 0) {
              // open dropdown if not already opened
              if (!this.toggleOpen) {
                this.toggleOpen = true;
              }
              // mark previous element for selection
              this._tmpSelectedValue = this._displayListBoxValues[index - 1];
              // adjust scrolling viewport
              this.focusSelectedElement();
            }
            break;
          case 'Enter': // select the marked element
            // check if element is really available
            if (
              this._displayListBoxValues.find(
                (item: TerraSuggestionBoxValueInterface) => item === this._tmpSelectedValue
              )
            ) {
              this._select(this._tmpSelectedValue); // select the chosen element
              this.toggleOpen = false; // close the dropdown
            }
            break;
          case 'Escape': // close the dropdown
            this.toggleOpen = false; // close the dropdown
            break;
        }
      } else {
        this._tmpSelectedValue = this._displayListBoxValues[0];
      }
    }
    event.stopPropagation();
  }

  /**
   * workaround to prevent calling the select() method on the label click
   * @param event
   */
  public _onInputClick(event: any): void {
    this.outputClicked.emit(event);

    // check if the input has been clicked
    if (event.target.nodeName === 'INPUT') {
      // select the input text <-> mark all
      event.target.select();
    }
  }

  public _select(value: TerraSuggestionBoxValueInterface): void {
    // check if value is available
    if (
      !this._displayListBoxValues.find(
        (elem: TerraSuggestionBoxValueInterface): boolean => elem === value
      )
    ) {
      return;
    }

    // update selected value
    this.selectedValue = value;

    // update last selected values
    if (this.inputWithRecentlyUsed) {
      this.updateLastSelectedValues();
    }

    // update temp selected value
    this._tmpSelectedValue = this.selectedValue;
  }

  private updateLastSelectedValues(): void {
    // check if newly selected value has been selected lastly
    let valueSelected: TerraSuggestionBoxValueInterface = this._lastSelectedValues.find(
      (value: TerraSuggestionBoxValueInterface) =>
        value.caption === this.selectedValue.caption && value.value === this.selectedValue.value
    );

    // add value to the last selected values, if it is not already added
    if (isNullOrUndefined(valueSelected)) {
      let length: number = this._lastSelectedValues.unshift({
        caption: this.selectedValue.caption,
        value: this.selectedValue.value
      });

      // check if length of the array exceeds the maximum amount of "lastly used" entries
      if (length > MAX_LASTLY_USED_ENTRIES) {
        // remove last element of the array
        this._lastSelectedValues.pop();
      }
    }
  }

  public get _textInputValue(): string {
    return this.__textInputValue;
  }

  public set _textInputValue(value: string) {
    if (this.__textInputValue !== value) {
      this.textInputValueChange.emit(value);
    }
    this.__textInputValue = value;
  }

  private clickedOutside(event: Event): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.toggleOpen = false;
    }
  }

  private focusSelectedElement(): void {
    // get the temporary selected DOM element
    const selectedElementRef: ElementRef = this._renderedListBoxValues.find((value: ElementRef) => {
      return value.nativeElement.classList.contains('selected');
    });

    if (!isNullOrUndefined(selectedElementRef)) {
      const spanElement: HTMLSpanElement = selectedElementRef.nativeElement;

      // scroll to the selected element
      spanElement.parentElement.scrollTop =
        spanElement.offsetTop - spanElement.parentElement.offsetTop;
    }
  }

  private setSelectedValue(value: TerraSuggestionBoxValueInterface, onChange?: boolean): void {
    // does not do anything if the value changes from undefined to null or reverse
    if (isNullOrUndefined(this._selectedValue) && isNullOrUndefined(value)) {
      return;
    }
    // the value has changed?
    if (this._selectedValue !== value) {
      // update local model
      this._selectedValue = value;
      this._tmpSelectedValue = this._selectedValue;

      // execute callback functions
      this.onTouchedCallback(); // this may be called when the text input value changes instead!?
      this.onChangeCallback(this.value);

      // finally update text input value
      if (!onChange) {
        this._textInputValue = !isNullOrUndefined(this._selectedValue)
          ? this._selectedValue.caption
          : '';
      }
    }
  }
}
