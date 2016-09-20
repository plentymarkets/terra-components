import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { PlentyInput } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const NUMBER_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyNumberInput),
    multi:       true
};

@Component({
               selector:  'plenty-number-input',
               // templateUrl: 'plenty-number-input.component.html',
               styleUrls: ['plenty-number-input.component.css'],
               providers: [NUMBER_INPUT_CONTROL_VALUE_ACCESSOR],
               template:  `<div class="input-unit-v1"
                                 tooltipPlacement="{{tooltipPlacement}}"
                                 tooltip="{{tooltipText}}"
                                 tooltipEnable="{{tooltipText}}"
                                 [ngClass]="{'error': !isValid, 'disabled': isDisabled}">
                              <label htmlFor="{{name}}">{{name}} <span *ngIf="isRequired">*</span></label>
                              <i *ngIf="name">?</i>
                              <input id="{{name}}" [type]="type" [(ngModel)]="value" name="{{name}}" (blur)="onBlur()" autocomplete="off" [disabled]="isDisabled" pattern="{{regex}}" step="1" min="{{minValue}}" max="{{maxValue}}">
                            </div>`
           })
export class PlentyNumberInput extends PlentyInput
{
    @Input() name:string;
    @Input() isRequired:boolean;
    @Input() emptyMessage:string;
    @Input() invalidMessage:string;
    @Input() tooltipText:string;
    @Input() disabled:boolean;
    @Input() tooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() maxLength:number;
    @Input() maxValue:number;
    @Input() minLength:number;
    @Input() minValue:number;

    constructor()
    {
        super('number', PlentyRegex.NUMERIC);
    }
}
