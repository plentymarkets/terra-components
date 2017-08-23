import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
               selector:  'terra-text-input',
               styles:    [require('./terra-text-input.component.scss')],
               template:  require('./terra-text-input.component.html'),
               providers: [
                   {
                       provide:     NG_VALUE_ACCESSOR,
                       useExisting: forwardRef(() => TerraTextInputComponent),
                       multi:       true
                   }
               ]
           })
export class TerraTextInputComponent extends TerraInputComponent
{
    @Input() inputIsPassword:boolean;
    @Output() outputOnInput:EventEmitter<any> = new EventEmitter<any>();

    constructor()
    {
        super(TerraRegex.MIXED);

        if(isNullOrUndefined(this.inputIsPassword))
        {
            this.inputIsPassword = false;
        }
    }

    public onInput():void
    {
        this.outputOnInput.emit();

    }
}
