import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { FormControl } from '@angular/forms';

export interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector:    'terra-input-example',
    styleUrls:   ['./terra-input.component.example.scss'],
    templateUrl: './terra-input.component.example.html',
})
export class TerraInputComponentExample implements OnInit
{
    public _name:string;
    public _lastName:string;
    public _email:string;
    public _password:string;
    public _passwordRepeat:string;
    public _birthday:any;
    public _state:Array<TerraSelectBoxValueInterface>;
    public _address:string;
    public _zip:number;
    public _city:string;
    public _newsletter:boolean;
    public _agbs:boolean;
    public _date:FormControl = new FormControl(new Date());
    public _serializedDate:FormControl = new FormControl((new Date()).toISOString());

    public stateSelection:Array<TerraSelectBoxValueInterface>;

    foods: Food[] = [
        {value: 'none', viewValue: ''},
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    public ngOnInit():void
    {
        this.stateSelection = [];
        this.stateSelection.push(
            {
                value:   'hessen',
                caption: 'Hessen'
            },
            {
                value:   'bayern',
                caption: 'Bayern'
            },
            {
                value:   'sachsen',
                caption: 'Sachsen'
            },
            {
                value:   'sachsen-anhalt',
                caption: 'Sachsen Anhalt'
            },
            {
                value:   'saarland',
                caption: 'Saarland'
            },
            {
                value:   'nordrhein westfalen',
                caption: 'Nordrhein Westfalen'
            },
            {
                value:   'rheinland pfalz',
                caption: 'Rheinland Pfalz'
            },
            {
                value:   'nordrhein westfalen',
                caption: 'Nordrhein Westfalen'
            },
            {
                value:   'niedersachsen',
                caption: 'Niedersachsen'
            },
            {
                value:   'baden-württemberg',
                caption: 'Baden-Württemberg'
            },
            {
                value:   'thüringen',
                caption: 'Thüringen'
            },
            {
                value:   'berlin',
                caption: 'Berlin'
            },
            {
                value:   'brandenburg',
                caption: 'Brandenburg'
            },
            {
                value:   'hamburg',
                caption: 'Hamburg'
            },
            {
                value:   'bremen',
                caption: 'Bremen'
            },
            {
                value:   'schleswig-holstein',
                caption: 'Schleswig-Holstein'
            },
            {
                value:   'mecklenburg-vorpommern',
                caption: 'Mecklenburg-Vorpommern'
            }
        );
    }

    public _showValues():void
    {
        alert(this._name + ' ' + this._lastName + ' ' +
              this._email + ' ' + this._password + ' ' +
              this._passwordRepeat + ' ' + this._birthday + ' ' +
              this._state + ' ' + this._address + ' ' +
              this._zip + ' ' + this._city + ' ' +
              this._newsletter + ' ' + this._agbs);
    }
}
