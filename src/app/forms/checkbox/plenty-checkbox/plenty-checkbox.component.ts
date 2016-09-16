import {
  Component,
  Input,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
             selector:    'plenty-checkbox',
             templateUrl: './plenty-checkbox.component.html',
             styleUrls:   ['./plenty-checkbox.component.css'],
             providers:   [
               {
                 provide:     NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => PlentyCheckbox),
                 multi:       true
               }
             ]
           })
export class PlentyCheckbox implements ControlValueAccessor
{
  @Input() isDisabled:boolean;
  @Input() caption:string;
  //The internal data model
  private innerValue:boolean = false;
  private _isIndeterminate = false;

  //Placeholders for the callbacks which are later provides
  //by the Control Value Accessor
  private onTouchedCallback:() => void = () =>
  {
  };

  private onChangeCallback:(v:any) => void = () =>
  {
  };

  constructor()
  {
  }

  //get accessor
  @Input()
  public get value():boolean
  {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  public set value(v:boolean)
  {
    this.isIndeterminate = false;

    if(v !== this.innerValue)
    {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //From ControlValueAccessor interface
  writeValue(value:boolean)
  {
    if(value !== this.innerValue)
    {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn:any)
  {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn:any)
  {
    this.onTouchedCallback = fn;
  }

  public get isIndeterminate():boolean
  {
    return this._isIndeterminate;
  }

  public set isIndeterminate(value:boolean)
  {
    //TODO is this correct?
    this.innerValue = false;
    this._isIndeterminate = value;
  }
}
