import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from '@angular/material/core';
import * as _moment from 'moment';

// tslint:disable-next-line:typedef
const moment = _moment;

export function dateFormat():{}
{
    let lang:string = localStorage.getItem('plentymarkets_lang_');

    if(lang === 'de')
    {
        return {
            parse:   {
                dateInput: 'DD.MM.YYYY',
            },
            display: {
                dateInput:          'DD.MM.YYYY',
                monthYearLabel:     'MMM YYYY',
                dateA11yLabel:      'DD.MM.YYYY',
                monthYearA11yLabel: 'MMMM YYYY',
            }
        };
    }
    else
    {
        return {
            parse:   {
                dateInput: 'MM/DD/YYYY',
            },
            display: {
                dateInput:          'MM/DD/YYYY',
                monthYearLabel:     'MMM YYYY',
                dateA11yLabel:      'MM/DD/YYYY',
                monthYearA11yLabel: 'MMMM YYYY',
            }
        };
    }


}

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
    encapsulation: ViewEncapsulation.None,
    providers:     [
        {
            provide:  DateAdapter,
            useClass: MomentDateAdapter,
            deps:     [MAT_DATE_LOCALE,
                       MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {
            provide:  MAT_DATE_FORMATS,
            useValue: dateFormat()
        }
    ],
})
export class AppComponent
{
    date = new FormControl(moment());
}
