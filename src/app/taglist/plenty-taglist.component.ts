import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentyTag } from '../tag/plenty-tag.component';

@Component({
               selector: 'plenty-taglist',
               styles:   [require('./plenty-taglist.component.scss')],
               template: require('./plenty-taglist.component.html')
           })
export class PlentyTaglist implements OnInit
{
    @Input() tagList:Array<PlentyTag>;

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
