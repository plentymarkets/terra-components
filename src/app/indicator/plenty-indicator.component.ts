import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector: 'plenty-indicator',
               styles:   [require('./plenty-indicator.component.scss').toString()],
               template: require('./plenty-indicator.component.html')
           })
export class PlentyIndicator implements OnInit
{
    @Input() label:string;
    @Input() type:string;

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
