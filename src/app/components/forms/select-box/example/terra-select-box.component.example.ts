import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-select-box-example',
    styles:   [require('./terra-select-box.component.example.scss')],
    template: require('./terra-select-box.component.example.html'),
})
export class TerraSelectBoxComponentExample implements OnInit
{
    private _selectableOptionTypesList:any;
    private _pickedValue:string;

    public ngOnInit():void
    {
        this._selectableOptionTypesList = [];
        this._selectableOptionTypesList.push(
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
