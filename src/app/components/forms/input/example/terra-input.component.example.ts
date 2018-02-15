import {
    Component,
    OnInit
} from "@angular/core";
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

@Component({
    selector: 'terra-input-example',
    styles:   [require('./terra-input.component.example.scss')],
    template: require('./terra-input.component.example.html'),
})
export class TerraInputComponentExample implements OnInit
{

    private _name:string;
    private _lastname:string;
    private _email:string;
    private _password:string;
    private _passwordrepeat:string;
    private _birthday:any;
    private _state:Array<TerraSelectBoxValueInterface>;
    private _address:string;
    private _zip:number;
    private _city:string;
    private _newsletter:boolean;
    private _agbs:boolean;

    private _stateSelection:Array<TerraSelectBoxValueInterface>;

    ngOnInit()
    {
        this._stateSelection = [];
        this._stateSelection.push(
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

    public showValues()
    {
        alert(this._name + ' ' + this._lastname + ' ' +
              this._email + ' ' + this._password + ' ' +
              this._passwordrepeat + ' ' + this._birthday + ' ' +
              this._state + ' ' + this._address + ' ' +
              this._zip + ' ' + this._city + ' ' +
              this._newsletter + ' ' + this._agbs);
    }
}
