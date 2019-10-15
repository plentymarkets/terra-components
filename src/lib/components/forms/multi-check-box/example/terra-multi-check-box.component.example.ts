import {
    Component,
    OnInit
} from '@angular/core';
import { TerraMultiCheckBoxValueInterface } from '../data/terra-multi-check-box-value.interface';

@Component({
    selector: 'terra-multi-check-box-example',
    styleUrls: [ './terra-multi-check-box.component.example.scss'],
    templateUrl: './terra-multi-check-box.component.example.html',
})
export class TerraMultiCheckBoxComponentExample implements OnInit
{
    public _values:Array<TerraMultiCheckBoxValueInterface>;
    public readonly _disabled:boolean = true;
    public _currentChangedCheckboxes:Array<TerraMultiCheckBoxValueInterface>;
    public _ngModelChangeCount:number = 0;

    public ngOnInit():void
    {
        this._values = [
            {
                value:    '1',
                caption:  'Value 1',
                selected: false
            },
            {
                value:    '2',
                caption:  'Value 2',
                selected: true
            },
            {
                value:    '3',
                caption:  'Value 3',
                selected: true
            },
            {
                value:    '4',
                caption:  'Value 4',
                selected: false
            },
            {
                value:    '5',
                caption:  'Value 5',
                selected: false
            }
        ];
    }

    public _valuesChanged():void
    {
        this._ngModelChangeCount++;
    }

    public _checkboxesChanged(checkboxes:Array<TerraMultiCheckBoxValueInterface>):void
    {
        this._currentChangedCheckboxes = checkboxes;
    }
}
