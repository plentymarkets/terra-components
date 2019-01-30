import {
    Component,
    Input,
    ViewChild
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

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
    public inputButtonList:Array<TerraButtonInterface>;

    @Input()
    public inputAddBox:boolean;

    @Input()
    public inputIsEmpty:boolean;

    @Input()
    public inputIsSelected:boolean;

    @Input()
    public inputId:number;

    @Input()
    public inputNoWordBreak:boolean;

    @ViewChild('buttonRef') private buttonRef:any;

    public get hasButtons():boolean
    {
        return !isNullOrUndefined(this.buttonRef.nativeElement.childNodes) && this.buttonRef.nativeElement.childNodes > 0 ||
               !isNullOrUndefined(this.inputButtonList) && this.inputButtonList.length > 0;
    }

    public get hasFooter():boolean
    {
        return !isNullOrUndefined(this.inputId) || (!isNullOrUndefined(this.inputTagList) && this.inputTagList.length > 0);
    }
}
