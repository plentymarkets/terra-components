import {
    Component,
    OnInit
} from '@angular/core';
import { TerraMultiSelectBoxValueInterface } from '../data/terra-multi-select-box-value.interface';

@Component({
    selector: 'terra-multi-select-box-example',
    styleUrls:   ['./terra-multi-select-box.component.example.scss'],
    templateUrl: './terra-multi-select-box.component.example.html',
})
export class TerraMultiSelectBoxComponentExample implements OnInit
{
    private values:Array<TerraMultiSelectBoxValueInterface>;
    private disabled1:boolean = false;
    private error1:boolean = false;
    private disabled2:boolean = false;
    private error2:boolean = true;
    private disabled3:boolean = true;
    private error3:boolean = false;

    public ngOnInit():void
    {
        this.values = [
            {
                value:    '0',
                caption:  'Value 1',
                selected: false
            },
            {
                value:    '1',
                caption:  'Value 2',
                selected: false
            },
            {
                value:    '2',
                caption:  'Value 3',
                selected: false
            },
            {
                value:    '3',
                caption:  'Value 4',
                selected: false
            },
            {
                value:    '4',
                caption:  'Value 5',
                selected: false
            }
        ];
    }
}
