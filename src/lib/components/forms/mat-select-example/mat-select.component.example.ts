import {
    Component,
    OnInit
} from '@angular/core';
import { Food } from '../../../../app/app.component';

export interface Food
{
    value:number;
    viewValue:string;
}

@Component({
    selector: 'terra-mat-select-example',
    template: require('./mat-select.component.example.html'),
})
export class MatSelectComponentExample implements OnInit
{
    public foods:Array<Food>;

    public ngOnInit():void
    {
        this.foods = [
            {
                value:     99,
                viewValue: 'Steak'
            },
            {
                value:     22,
                viewValue: 'Pizza'
            },
            {
                value:     1,
                viewValue: 'ziyad'
            },
            {
                value:     4,
                viewValue: 'Tacos'
            }
        ];
    }
}
