import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { StringHelper } from '../../../helpers/string.helper';
import { noop } from 'rxjs';

@Component({
  selector: 'terra-select-box',
  styleUrls: ['./terra-select-box.component.scss'],
  templateUrl: './terra-select-box.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TerraSelectBoxComponent,
      multi: true
    }
  ]
})
/**
 * @deprecated since v4. Use '<mat-select>' instead. See {@link https://material.angular.io/components/select/overview}
 */
export class TerraSelectBoxComponent implements OnInit, OnChanges {
  @Input()
  public inputName: string = ' ';

  @Input()
  public inputIsRequired: boolean;

  @Input()
  public inputIsDisabled: boolean;

  @Input()
  public inputIsSmall: boolean;

  @Input()
  public inputOpenOnTop: boolean;

  @Input()
  public inputTooltipText: string;

  /**
   * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
   */
  @Input()
  public inputTooltipPlacement: string;

  @Input()
  public inputListBoxValues: Array<TerraSelectBoxValueInterface>;

  /**
   * @deprecated use ngModelChange instead
   */
  @Output()
  public inputSelectedValueChange: EventEmitter<TerraSelectBoxValueInterface> = new EventEmitter<
    TerraSelectBoxValueInterface
  >();

  public isValid: boolean;

  public _selectedValue: TerraSelectBoxValueInterface;
  public _tmpSelectedValue: TerraSelectBoxValueInterface;
  public _hasLabel: boolean;
  // tslint:disable-next-line:variable-name
  public __toggleOpen: boolean;

  private _value: number | string;
  private _isInit: boolean;
  private _clickListener: (event: Event) => void;

  @ViewChildren('renderedListBoxValues')
  private _renderedListBoxValues: QueryList<ElementRef>;

  /**
   *
   * Two way data binding by ngModel
   */
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  /**
   * @deprecated use ngModel instead
   */
  public get inputSelectedValue(): number | string {
    return this._selectedValue.value;
  }

  constructor(private _elementRef: ElementRef) {
    this._clickListener = (event: Event): void => {
      this._clickedOutside(event);
    };

    this._isInit = false;
    this.inputIsSmall = false;
    this.inputOpenOnTop = false;
  }

  public ngOnInit(): void {
    this.isValid = true;
    this.__toggleOpen = false;
    this._hasLabel = !StringHelper.isNullUndefinedOrEmpty(this.inputName);
    this._isInit = true;
  }

  /**
   *
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (
      this._isInit === true &&
      changes['inputListBoxValues'] &&
      changes['inputListBoxValues'].currentValue.length > 0 &&
      !this.inputListBoxValues.find(
        (x: TerraSelectBoxValueInterface): boolean => this._selectedValue === x
      )
    ) {
      this._select(this.inputListBoxValues[0]);
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouchedCallback = fn;
  }

  public writeValue(value: any): void {
    this.value = value;
  }

  public get _emptyValueSelected(): boolean {
    return (
      isNullOrUndefined(this._selectedValue) ||
      (StringHelper.isNullUndefinedOrEmpty(this._selectedValue.caption.toString()) &&
        StringHelper.isNullUndefinedOrEmpty(this._selectedValue.icon))
    );
  }

  public get value(): any {
    return this._value;
  }

  public set value(value: any) {
    this._value = value;

    if (!isNullOrUndefined(value)) {
      let valueToSelect: TerraSelectBoxValueInterface = this.inputListBoxValues.find(
        (item: TerraSelectBoxValueInterface) => {
          return item.value === value;
        }
      );
      if (!isNullOrUndefined(valueToSelect)) {
        this._selectedValue = valueToSelect;
      } else if (!isNullOrUndefined(this.inputListBoxValues[0])) {
        this._selectFallbackValue();
      }
    } else if (!isNullOrUndefined(this.inputListBoxValues[0])) {
      this._selectFallbackValue();
    }
  }

  public set _toggleOpen(value: boolean) {
    if (this.__toggleOpen !== value && value === true) {
      document.addEventListener('click', this._clickListener, true);
    } else if (this.__toggleOpen !== value && value === false) {
      document.removeEventListener('click', this._clickListener);
    }

    this.__toggleOpen = value;
  }

  public get _toggleOpen(): boolean {
    return this.__toggleOpen;
  }

  public validate(formControl: FormControl): void {
    if (formControl.valid) {
      this.isValid = true;
    } else {
      if (!this.inputIsDisabled) {
        this.isValid = false;

        // if(this.inputIsRequired && (isNullOrUndefined(this.value) || this.value.length == 0))
        // {
        //    let emptyMessage:string;
        //
        //    if(!this.inputEmptyMessage || this.inputEmptyMessage.length == 0)
        //    {
        //        //// TODO i18n
        //        // emptyMessage = 'Mach eine Eingabe!';
        //
        //    }
        //    else
        //    {
        //        emptyMessage = this.inputEmptyMessage;
        //
        //        this.alert.addAlert({
        //                                 msg:              emptyMessage,
        //                                 closable:         true,
        //                                 type:             'danger',
        //                                 dismissOnTimeout: 0
        //                             });
        //    }
        // }
        // else if(!isNullOrUndefined(this.value) && this.value.length > 0)
        // {
        //    let invalidMessage:string;
        //
        //    if(!this.inputInvalidMessage || this.inputInvalidMessage.length == 0)
        //    {
        //        //// TODO i18n
        //        // invalidMessage = 'Eingabe ungültig!';
        //    }
        //    else
        //    {
        //        invalidMessage = this.inputInvalidMessage;
        //
        //        this.alert.addAlert({
        //                                 msg:              invalidMessage,
        //                                 closable:         true,
        //                                 type:             'danger',
        //                                 dismissOnTimeout: 0
        //                             });
        //    }
        // }
      }
    }
  }

  /**
   *
   * @param value
   */
  public _select(value: TerraSelectBoxValueInterface): void {
    if (isNullOrUndefined(this._selectedValue) || this._selectedValue.value !== value.value) {
      this._onChangeCallback(value.value);
    }

    this._selectedValue = value;
    this._onTouchedCallback();
  }

  public _onClick(evt: Event): void {
    evt.stopPropagation(); // prevents the click listener on the document to be fired right after
    this._toggleOpen = !this._toggleOpen;
  }

  public _onKeyDown(event: KeyboardEvent): void {
    // check if one of the dedicated keys has been pressed
    if (this._isIncorrectKeyEvent(event.code)) {
      return;
    }

    // check if there is any selected value yet
    if (isNullOrUndefined(this._tmpSelectedValue) && this.inputListBoxValues.length > 0) {
      this._tmpSelectedValue = this.inputListBoxValues[0];
    }

    // get the array index of the selected value
    let index: number = this.inputListBoxValues.findIndex(
      (item: TerraSelectBoxValueInterface) => item.value === this._tmpSelectedValue.value
    );

    // check if element has been found
    if (index >= 0) {
      // determine the key, that has been pressed
      switch (event.code) {
        case 'Space':
          this._toggleOpen = !this._toggleOpen;
          break;
        case 'ArrowDown': // mark the succeeding list element
          if (index + 1 < this.inputListBoxValues.length) {
            // open dropdown if not already opened
            if (!this._toggleOpen) {
              this._toggleOpen = true;
            }
            // mark next element for selection
            this._tmpSelectedValue = this.inputListBoxValues[index + 1];
            // adjust scrolling viewport
            this._focusSelectedElement();
          }
          break;
        case 'ArrowUp': // mark the preceding list element
          if (index - 1 >= 0) {
            // open dropdown if not already opened
            if (!this._toggleOpen) {
              this._toggleOpen = true;
            }
            // mark previous element for selection
            this._tmpSelectedValue = this.inputListBoxValues[index - 1];
            // adjust scrolling viewport
            this._focusSelectedElement();
          }
          break;
        case 'Enter': // select the marked element
          // check if element is really available
          if (
            this._toggleOpen &&
            this.inputListBoxValues.find(
              (item: TerraSelectBoxValueInterface) => item === this._tmpSelectedValue
            )
          ) {
            this._select(this._tmpSelectedValue); // select the chosen element
            this._toggleOpen = false; // close the dropdown
          }
          break;
        case 'Escape': // close the dropdown
          this._toggleOpen = false; // close the dropdown
          break;
      }
    }

    event.preventDefault();
    // stop event bubbling
    event.stopPropagation();
  }

  public _onBlur(): void {
    this._toggleOpen = false;
  }

  /**
   *
   * @param event
   */
  private _clickedOutside(event: Event): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this._toggleOpen = false;
    }
  }

  private _isIncorrectKeyEvent(eventCode: string): boolean {
    return !(
      eventCode === 'ArrowDown' ||
      eventCode === 'ArrowUp' ||
      eventCode === 'Enter' ||
      eventCode === 'Escape' ||
      eventCode === 'Space'
    );
  }

  private _focusSelectedElement(): void {
    // get the temporary selected DOM element
    const selectedElementRef: ElementRef = this._renderedListBoxValues.find((value: ElementRef) => {
      return value.nativeElement.classList.contains('selected');
    });

    // check if the element has been found
    if (selectedElementRef) {
      const spanElement: HTMLSpanElement = selectedElementRef.nativeElement;

      // scroll to the selected element
      spanElement.parentElement.scrollTop =
        spanElement.offsetTop - spanElement.parentElement.offsetTop;
    }
  }

  private _selectFallbackValue(): void {
    this._selectedValue = this.inputListBoxValues[0];
    this._onTouchedCallback();
    this._onChangeCallback(this.inputListBoxValues[0].value);
  }
}
