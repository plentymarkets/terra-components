import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentyTag } from '../tag/plenty-tag.component';

@Component({
               selector: 'terra-taglist',
               styles:   [require('./plenty-taglist.component.scss').toString()],
               template: require('./plenty-taglist.component.html')
           })
export class PlentyTaglist implements OnInit
{
    @Input() inputTagList:Array<PlentyTag>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
}
