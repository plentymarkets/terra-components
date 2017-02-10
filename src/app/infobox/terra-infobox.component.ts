import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';
import { TerraButtonInterface } from '../button/data/terra-button.interface';

@Component({
               selector: 'terra-infobox',
               styles:   [require('./terra-infobox.component.scss')],
               template: require('./terra-infobox.component.html'),
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
