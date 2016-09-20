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

export const DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyDoubleInput),
    multi:       true
};

@Component({
               selector:  'plenty-double-input',
               // templateUrl: 'plenty-double-input.component.html',
               // styleUrls: ['plenty-double-input.component.css'],
               styles:    [``],
               providers: [DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR],
               template:  `<div class="input-unit-v1"
                                 tooltipPlacement="{{tooltipPlacement}}"
                                 tooltip="{{tooltipText}}"
                                 tooltipEnable="{{tooltipText}}"
                                 [ngClass]="{'error': !isValid, 'disabled': isDisabled}">
                              <label htmlFor="{{name}}">{{name}} <span *ngIf="isRequired">*</span></label>
                              <i *ngIf="name">?</i>
                              <input id="{{name}}" [type]="type" [(ngModel)]="value" name="{{name}}" (blur)="onBlur()" autocomplete="off" [disabled]="isDisabled" pattern="{{regex}}" step="0.01">
                            </div>`
           })
export class PlentyDoubleInput extends PlentyInput
{
    @Input() name:string;
    @Input() isRequired:boolean;
    @Input() tooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() tooltipText:string;
    @Input() disabled:boolean;

    constructor()
    {
        super('number', PlentyRegex.DOUBLE);
    }
}
