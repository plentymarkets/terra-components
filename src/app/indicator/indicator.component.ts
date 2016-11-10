import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
               selector: 'terra-indicator',
               styles:   [require('./indicator.component.scss').toString()],
               template: require('./indicator.component.html')
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
