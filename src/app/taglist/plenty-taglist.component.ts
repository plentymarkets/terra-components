import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { PlentyTag } from '../tag/plenty-tag.component';

@Component({
               selector:    'plenty-taglist',
               templateUrl: './plenty-taglist.component.html',
               styleUrls:   ['./plenty-taglist.component.css']
           })
export class PlentyTaglist implements OnInit
{
    @Input() tagList: Array<PlentyTag>;

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
