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
    @Input() inputLabel:string;
    @Input() inputType:string;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
}
