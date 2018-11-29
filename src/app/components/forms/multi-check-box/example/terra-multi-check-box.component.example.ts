import {
    Component,
    OnInit
} from '@angular/core';
import { TerraMultiCheckBoxValueInterface } from '../data/terra-multi-check-box-value.interface';

@Component({
    selector: 'terra-multi-check-box-example',
    styles:   [require('./terra-multi-check-box.component.example.scss')],
    template: require('./terra-multi-check-box.component.example.html'),
})
export class TerraMultiCheckBoxComponentExample implements OnInit
{
    protected values:Array<TerraMultiCheckBoxValueInterface>;
    protected disabled:boolean = true;
    protected currentChangedCheckboxes:Array<TerraMultiCheckBoxValueInterface>;
    protected ngModelChangeCount:number = 0;

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
                selected: true
            },
            {
                value:    '2',
                caption:  'Value 3',
                selected: true
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

    protected valuesChanged():void
    {
        this.ngModelChangeCount++;
    }

    protected checkboxesChanged(checkboxes:Array<TerraMultiCheckBoxValueInterface>):void
    {
        this.currentChangedCheckboxes = checkboxes;
    }
}
