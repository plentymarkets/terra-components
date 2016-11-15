import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';
import { TerraButtonInterface } from '../button/data/terra-button.interface';

@Component({
               selector:      'terra-infobox',
               styles:        [require('./terra-infobox.component.scss').toString()],
               template:      require('./terra-infobox.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class TerraInfoboxComponent implements OnInit
{
    @Input() inputTagList:Array<TerraTagInterface>;
    @Input() inputButtonList:Array<TerraButtonInterface>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
}
