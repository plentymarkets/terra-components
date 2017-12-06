import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraFormFieldConditionalContainer } from '../data/terra-form-field-conditional-container';

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
    @Input() public inputFormFields:Array<TerraFormFieldBase<any>>;
    @Input() public inputFormGroup:FormGroup;
    @Input() public inputSubSwitch:boolean;

    constructor()
    {
        this.inputSubSwitch = false;
    }

    // Auf TerraFormFieldConditionalBean umbauen
    private onConditionChanged(formField:TerraFormFieldConditionalContainer):void
    {
        for(let conditionalEntry in formField.conditionalEntries)
        {
            if(formField.conditionalEntries.hasOwnProperty(conditionalEntry))
            {
                if(this.inputFormGroup.get(formField.key).value === conditionalEntry)
                {
                    formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBase<any>) =>
                    {
                        this.inputFormGroup.get(entry.key).enable({onlySelf: true, emitEvent: false});
                    });
                }
                else
                {
                    formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBase<any>) =>
                    {
                        this.inputFormGroup.get(entry.key).disable({onlySelf: true, emitEvent: false});
                    });
                }
            }
        }
    }
}
