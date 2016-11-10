import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { PlentyTaglist } from '../taglist/plenty-taglist.component';
import { PlentyButton } from '../button/plenty-button.component';

@Component({
               selector:      'terra-infobox',
               styles:        [require('./plenty-infobox.component.scss').toString()],
               template:      require('./plenty-infobox.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class PlentyInfobox implements OnInit
{
    @Input() inputTagList:Array<PlentyTaglist>;
    @Input() inputButtonList:Array<PlentyButton>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
}
