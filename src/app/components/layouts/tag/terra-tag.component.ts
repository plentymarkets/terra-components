import {
    Component,
    ElementRef,
    Input,
    AfterViewInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Color } from '../../forms/input/color-picker/color.helper';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent implements AfterViewInit
{
    @Input()
    public inputBadge:string;

    @Input()
    public inputIsTagged:boolean;

    @Input()
    public inputIsTaggable:boolean;

    @Input()
    public inputCustomClass:string;

    @Input()
    public inputOwnColor:string;

    constructor(private _element:ElementRef)
    {
        this.inputIsTagged = false;
        this.inputIsTaggable = false;
        this.inputOwnColor = null;
        this.inputCustomClass = null;
    }

    public ngAfterViewInit():void
    {
        if(!isNullOrUndefined(this.inputOwnColor))
        {
            /** The native element in terra-tag */
            let div:HTMLElement = this._element.nativeElement.firstChild;
            /** The two span elements ('tag-icon' and 'tag-text') under the native element. */
            let spans:NodeListOf<HTMLSpanElement> = div.getElementsByTagName('span');

            //  Set the background color for the native element
            div.style.backgroundColor = this.inputOwnColor;

            // Set the foreground color in the span elements
            let color:Color = new Color(this.inputOwnColor);
            let fgColor:string = color.isDark() ? '#ffffff' : '#000000';
            let length:number = 0;
            while(length < spans.length)
            {
                spans.item(length++).style.color = fgColor;
            }
        }
    }
}
