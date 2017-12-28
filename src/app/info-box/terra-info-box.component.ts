import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';
import { isNullOrUndefined } from 'util';

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

    public get hasFooter(): boolean
    {
        return !isNullOrUndefined( this.inputId )
               || ( !isNullOrUndefined( this.inputTagList ) && this.inputTagList.length > 0 );
    }

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
