import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';

@Component({
               selector: 'terra-info-box',
               styles:   [require('./terra-info-box.component.scss')],
               template: require('./terra-info-box.component.html')
           })
export class TerraInfoBoxComponent implements OnInit
{
    @Input() inputTagList:Array<TerraTagInterface>;
    @Input() inputAddBox:boolean;
    @Input() inputIsEmpty:boolean;
    @Input() inputIsSelected:boolean;
    @Input() inputId:number;

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
