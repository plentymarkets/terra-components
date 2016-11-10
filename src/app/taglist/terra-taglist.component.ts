import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { TerraTagComponent } from '../tag/terra-tag.component';

@Component({
               selector: 'terra-taglist',
               styles:   [require('./terra-taglist.component.scss').toString()],
               template: require('./terra-taglist.component.html')
           })
export class TerraTaglistComponent implements OnInit
{
    @Input() inputTagList:Array<TerraTagComponent>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
}
