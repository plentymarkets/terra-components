import {
    Component,
    Pipe,
    PipeTransform,
    ViewEncapsulation
} from '@angular/core';

export interface Food
{
    value:string;
    viewValue:string;
}

@Pipe({name: 'matSort'})
export class MatSortPipe implements PipeTransform
{
    transform(allHeroes:Food[], sortingKey:string)
    {
        return allHeroes.sort((a:Food, b:Food) =>
            {
                if(a[sortingKey].toLowerCase() > b[sortingKey].toLowerCase())
                {
                    return 1;
                }

                if(a[sortingKey].toLowerCase() < b[sortingKey].toLowerCase())
                {
                    return -1;
                }

                return 0;
            }
        );
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
    template:      require('./app.component.html'),
    styles:        [require('./app.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    foods:Food[] = [
        {
            value:     'steak-0',
            viewValue: 'Steak'
        },
        {
            value:     'pizza-1',
            viewValue: 'Pizza'
        },
        {
            value:     'ziyad',
            viewValue: 'ziyad'
        },
        {
            value:     'tacos-2',
            viewValue: 'Tacos'
        }
    ];
}
