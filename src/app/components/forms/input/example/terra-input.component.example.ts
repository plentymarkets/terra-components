import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

@Component({
    selector: 'terra-input-example',
    styles:   [require('./terra-input.component.example.scss')],
    template: require('./terra-input.component.example.html'),
})
export class TerraInputComponentExample implements OnInit
{

    protected name:string;
    protected lastName:string;
    protected email:string;
    protected password:string;
    protected passwordRepeat:string;
    protected birthday:any;
    protected state:Array<TerraSelectBoxValueInterface>;
    protected address:string;
    protected zip:number;
    protected city:string;
    protected newsletter:boolean;
    protected agbs:boolean;

    protected stateSelection:Array<TerraSelectBoxValueInterface>;

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

    public showValues():void
    {
        alert(this.name + ' ' + this.lastName + ' ' +
              this.email + ' ' + this.password + ' ' +
              this.passwordRepeat + ' ' + this.birthday + ' ' +
              this.state + ' ' + this.address + ' ' +
              this.zip + ' ' + this.city + ' ' +
              this.newsletter + ' ' + this.agbs);
    }
}
