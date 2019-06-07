import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../data/terra-select-box.interface';

@Component({
    selector: 'terra-select-box-example',
    styleUrls: [ './terra-select-box.component.example.scss'],
    templateUrl: './terra-select-box.component.example.html',
})
export class TerraSelectBoxComponentExample implements OnInit
{
    protected selectBoxValueList:Array<TerraSelectBoxValueInterface> = [];
    protected selectedValue:string;

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
    }
}
