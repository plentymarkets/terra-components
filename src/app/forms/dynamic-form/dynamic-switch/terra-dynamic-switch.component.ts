import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBaseBean } from '../data/terra-form-field-base.bean';
import { TerraFormFieldConditionalContainerBean } from '../data/terra-form-field-conditional-container';

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
    @Input() public inputFormFields:Array<TerraFormFieldBaseBean<any>>;
    @Input() public inputFormGroup:FormGroup;
    @Input() public inputSubSwitch:boolean;

    constructor()
    {
        this.inputSubSwitch = false;
    }

    // Auf TerraFormFieldConditionalBean umbauen
    private onConditionChanged(formField:TerraFormFieldConditionalContainerBean):void
    {
        for(let conditionalEntry in formField.conditionalEntries)
        {
            if(formField.conditionalEntries.hasOwnProperty(conditionalEntry))
            {
                if(this.inputFormGroup.get(formField.key).value === conditionalEntry)
                {
                    formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBaseBean<any>) =>
                    {
                        this.inputFormGroup.get(entry.key).enable({onlySelf: true, emitEvent: false});
                    });
                }
                else
                {
                    formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBaseBean<any>) =>
                    {
                        this.inputFormGroup.get(entry.key).disable({onlySelf: true, emitEvent: false});
                    });
                }
            }
        }
    }
}
