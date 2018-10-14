import {
    Component,
    Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraFormFieldConditionalContainer } from '../data/terra-form-field-conditional-container';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-dynamic-switch',
    templateUrl: './terra-dynamic-switch.component.html',
    styleUrls:   ['./terra-dynamic-switch.component.scss']
})
export class TerraDynamicSwitchComponent
{
    // Auf TerraFormFieldConditionalBean umbauen
    // private readonly DELAY_FOR_CHANGE_DETECTION:number = 1;

    @Input()
    public inputFormFields:Array<TerraFormFieldBase<any>>;

    @Input()
    public inputFormGroup:FormGroup;

    @Input()
    public inputSubSwitch:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputPortletHeader:string;

    @Input()
    public inputUsePortlet:boolean;

    // Necessary for using enum in html
    protected controlTypeEnum:any = TerraControlTypeEnum;

    constructor()
    {
        this.inputSubSwitch = false;
    }

    // Auf TerraFormFieldConditionalBean umbauen
    private onConditionChanged(formField:TerraFormFieldConditionalContainer):void
    {
        // Observable.of(null).delay(this.DELAY_FOR_CHANGE_DETECTION).subscribe(() =>
        // {
        //     for(let conditionalEntry in formField.conditionalEntries)
        //     {
        //         if(formField.conditionalEntries.hasOwnProperty(conditionalEntry))
        //         {
        //             if(this.inputFormGroup.get(formField.key).value === conditionalEntry)
        //             {
        //                 formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBase<any>) =>
        //                 {
        //                     this.inputFormGroup.get(entry.key).enable({
        //                         onlySelf:  true,
        //                         emitEvent: true
        //                     });
        //                 });
        //             }
        //             else
        //             {
        //                 formField.conditionalEntries[conditionalEntry].forEach((entry:TerraFormFieldBase<any>) =>
        //                 {
        //                     this.inputFormGroup.get(entry.key).disable({
        //                         onlySelf:  true,
        //                         emitEvent: true
        //                     });
        //                 });
        //             }
        //         }
        //     }
        // });
    }
}
