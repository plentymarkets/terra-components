import {
    Component,
    OnInit
} from '@angular/core';

export interface Food
{
    value:number;
    viewValue:string;
}

@Component({
    selector: 'tc-mat-select-example',
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
                viewValue: 'Burger'
            },
            {
                value:     4,
                viewValue: 'Tacos'
            }
        ];
    }
}
