import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraTagInterface } from '../../../../';

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

    public get hasFooter():boolean
    {
        return !isNullOrUndefined(this.inputId) || (!isNullOrUndefined(this.inputTagList) && this.inputTagList.length > 0);
    }
}
