import {
    Component,
    Input
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraTagInterface } from '../../../../';

@Component({
    selector: 'terra-info-box',
    styles:   [require('./terra-info-box.component.scss')],
    template: require('./terra-info-box.component.html')
})
export class TerraInfoBoxComponent
{
    @Input()
    public inputTagList:Array<TerraTagInterface>;

    @Input()
    public inputAddBox:boolean;

    @Input()
    public inputIsEmpty:boolean;

    @Input()
    public inputIsSelected:boolean;

    @Input()
    public inputId:number;

    public get hasFooter():boolean
    {
        return !isNullOrUndefined(this.inputId) || (!isNullOrUndefined(this.inputTagList) && this.inputTagList.length > 0);
    }
}
