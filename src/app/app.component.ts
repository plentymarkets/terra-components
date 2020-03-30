import {
    Component,
    ViewEncapsulation
} from '@angular/core';

export interface PeriodicElement
{
    name:string;
    position:number;
    weight:number;
    symbol:string;
}

const ELEMENT_DATA:Array<PeriodicElement> = [
    {
        position: 1,
        name:     'Hydrogen',
        weight:   1.0079,
        symbol:   'H'
    },
    {
        position: 2,
        name:     'Helium',
        weight:   4.0026,
        symbol:   'He'
    },
    {
        position: 3,
        name:     'Lithium',
        weight:   6.941,
        symbol:   'Li'
    },
    {
        position: 4,
        name:     'Beryllium',
        weight:   9.0122,
        symbol:   'Be'
    },
    {
        position: 5,
        name:     'Boron',
        weight:   10.811,
        symbol:   'B'
    },
    {
        position: 6,
        name:     'Carbon',
        weight:   12.0107,
        symbol:   'C'
    },
    {
        position: 7,
        name:     'Nitrogen',
        weight:   14.0067,
        symbol:   'N'
    },
    {
        position: 8,
        name:     'Oxygen',
        weight:   15.9994,
        symbol:   'O'
    },
    {
        position: 9,
        name:     'Fluorine',
        weight:   18.9984,
        symbol:   'F'
    },
    {
        position: 10,
        name:     'Neon',
        weight:   20.1797,
        symbol:   'Ne'
    },
];

/**
 * @description This is a sandbox app which can be used to test out functionality from the TerraComponents library.
 * By default, it displays all the examples provided by the library.
 *
 * NOTE: This app is not compiled when running `npm run build`. Hence, it will also not be published.
 */
@Component({
    selector:      'tc-sandbox-app',
    templateUrl:   './app.component.html',
    styleUrls:     ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    public displayedColumns: Array<string> = ['position', 'name', 'weight', 'symbol'];
    public dataSource:Array<PeriodicElement> = ELEMENT_DATA;
}
