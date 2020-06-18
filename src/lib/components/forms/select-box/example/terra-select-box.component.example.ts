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
    public _selectBoxValueList:Array<TerraSelectBoxValueInterface> = [];
    public _coloredSelectBoxValueList:Array<TerraSelectBoxValueInterface> = [];
    public _selectedValue:string;
    public _selectedWebstore:boolean;

    public ngOnInit():void
    {
        this._selectBoxValueList.push(
            {
                value:   'en',
                caption: 'english'
            },
            {
                value:   'de',
                caption: 'german'
            }
        );
        this._coloredSelectBoxValueList.push(
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
