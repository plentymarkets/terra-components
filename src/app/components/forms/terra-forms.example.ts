import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from './select-box/data/terra-select-box.interface';

@Component({
    selector:    'terra-forms-example',
    templateUrl: 'terra-forms.example.html'
})

export class TerraFormsExampleComponent
{
    protected radioValue:number = 1;
    protected readonly listBoxValues:Array<TerraSelectBoxValueInterface> = [
        {
            caption: '',
            value: null
        },
        {
            caption: '1',
            value:   1
        },
        {
            caption: '2',
            value:   2
        }
    ];

    protected submit():void
    {
        // implement submit routine here
    }
}
