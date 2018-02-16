import {
    Component,
    OnInit
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'terra-select-box-example',
    styles:   [require('./terra-select-box.component.example.scss')],
    template: require('./terra-select-box.component.example.html'),
})
export class TerraSelectBoxComponentExample implements OnInit
{
    private _selectableOptionTypesList:any;
    private _pickedValue:string;

    constructor()
    {
    }

    ngOnInit()
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