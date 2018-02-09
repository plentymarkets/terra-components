import {
    Component,
    Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraFormFieldConditionalContainer } from '../data/terra-form-field-conditional-container';
import { Observable } from 'rxjs/Observable';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-dynamic-switch',
    template: require('./terra-dynamic-switch.component.html'),
    styles:   [require('./terra-dynamic-switch.component.scss')]
})
export class TerraDynamicSwitchComponent
{
    private readonly DELAY_FOR_CHANGE_DETECTION:number = 1;

    @Input() public inputFormFields:Array<TerraFormFieldBase<any>>;
    @Input() public inputFormGroup:FormGroup;
    @Input() public inputSubSwitch:boolean;

    public constructor()
    {
        this.inputSubSwitch = false;
    }

    // Auf TerraFormFieldConditionalBean umbauen
    private onConditionChanged(formField:TerraFormFieldConditionalContainer):void
    {
        Observable.of(null).delay(this.DELAY_FOR_CHANGE_DETECTION).subscribe(() =>
        {
            for(let conditionalEntry in formField.conditionalEntries)
            {
                if(formField.conditionalEntries.hasOwnProperty(conditionalEntry))
                {
                    if(this.inputFormGroup.get(formField.key).value === conditionalEntry)
                    {
                        formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBase<any>) =>
                        {
                            this.inputFormGroup.get(entry.key).enable({
                                onlySelf:  true,
                                emitEvent: true
                            });
                        });
                    }
                    else
                    {
                        formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBase<any>) =>
                        {
                            this.inputFormGroup.get(entry.key).disable({
                                onlySelf:  true,
                                emitEvent: true
                            });
                        });
                    }
                }
            }
        });
    }
}
