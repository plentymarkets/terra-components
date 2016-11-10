import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { TerraTaglistComponent } from '../taglist/terra-taglist.component';
import { TerraButtonComponent } from '../button/terra-button.component';

@Component({
               selector:      'terra-infobox',
               styles:        [require('./terra-infobox.component.scss').toString()],
               template:      require('./terra-infobox.component.html'),
               encapsulation: ViewEncapsulation.None
           })
export class TerraInfoboxComponent implements OnInit
{
    @Input() inputTagList:Array<TerraTaglistComponent>;
    @Input() inputButtonList:Array<TerraButtonComponent>;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
}
