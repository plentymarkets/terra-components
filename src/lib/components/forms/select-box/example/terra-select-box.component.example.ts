import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../data/terra-select-box.interface';
import { AllowedColors } from '../data/allowed.colors.enum';

@Component({
    selector: 'terra-select-box-example',
    styleUrls: [ './terra-select-box.component.example.scss'],
    templateUrl: './terra-select-box.component.example.html',
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
                value: true,
                caption: 'webshop 1'
            },
            {
                value: true,
                caption: 'webshop 2',
                color: AllowedColors.add
            }
        );
    }
}
