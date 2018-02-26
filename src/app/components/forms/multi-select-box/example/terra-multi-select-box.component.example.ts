import {
    Component
} from "@angular/core";
import { TerraMultiSelectBoxValueInterface } from '../data/terra-multi-select-box-value.interface';

@Component({
    selector: 'terra-multi-select-box-example',
    styles:   [require('./terra-multi-select-box.component.example.scss')],
    template: require('./terra-multi-select-box.component.example.html'),
})
export class TerraMultiSelectBoxComponentExample
{
    private values:Array<TerraMultiSelectBoxValueInterface>;
    private disabled1:boolean = false;
    private error1:boolean = false;
    private disabled2:boolean = false;
    private error2:boolean = true;
    private disabled3:boolean = true;
    private error3:boolean = false;

    constructor()
    {
    }

    ngOnInit()
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
