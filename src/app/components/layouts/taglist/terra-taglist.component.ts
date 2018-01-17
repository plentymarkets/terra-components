import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';

@Component({
    selector: 'terra-taglist',
    styles:   [require('./terra-taglist.component.scss')],
    template: require('./terra-taglist.component.html')
})
export class TerraTaglistComponent implements OnInit
{
    @Input() inputTagList:Array<TerraTagInterface>;

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
