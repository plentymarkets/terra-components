import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../data/terra-select-box.interface';
import { AllowedColors } from '../data/allowed.colors.enum';

@Component({
    selector: 'terra-select-box-example',
    styles:   [require('./terra-select-box.component.example.scss')],
    template: require('./terra-select-box.component.example.html'),
})
export class TerraSelectBoxComponentExample implements OnInit
{
    protected selectBoxValueList:Array<TerraSelectBoxValueInterface> = [];
    protected coloredSelectBoxValueList:Array<TerraSelectBoxValueInterface> = [];
    protected selectedValue:string;
    protected selectedWebstore:boolean;

    public ngOnInit():void
    {
        this.selectBoxValueList.push(
            {
                value:   'en',
                caption: 'english'
            },
            {
                value:   'de',
                caption: 'german'
            }
        );

        this.coloredSelectBoxValueList.push(
            {
                value:   1,
                caption: 'Ziege'
            },
            {
                value:   2,
                caption: 'Elefant'
            },
            {
                value:   3,
                caption: 'Bär',
                color:   AllowedColors.add
            },
            {
                value:   4,
                caption: 'Hirsch'
            },
            {
                value:   5,
                caption: 'Biene'
            }
        );
    }
}
