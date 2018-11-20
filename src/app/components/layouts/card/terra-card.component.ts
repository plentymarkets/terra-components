import {
    AfterContentChecked,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-card',
    styles:   [require('./terra-card.component.scss')],
    template: require('./terra-card.component.html')
})
export class TerraCardComponent implements AfterContentChecked
{
    @ViewChild('header')
    public viewChildHeader:ElementRef;

    @ViewChild('footer')
    public viewChildFooter:ElementRef;

    /**
     * @description an url to set for the background image of the card
     */
    @Input()
    public inputImagePath:string;

    /**
     * @description set an icon class if there is no image path set
     */
    @Input()
    public inputPlaceholderIcon:string;

    /**
     * @description set a class to show footer and wrapping div element as selected
     */
    @Input()
    public inputIsSelected:boolean = false;

    private showHeader:boolean;
    private showFooter:boolean;

    constructor()
    {
        this.showHeader = false;
        this.showFooter = false;
    }

    public ngAfterContentChecked():void
    {
        this.showHeader = this.viewChildHeader.nativeElement.children.length > 0;
        this.showFooter = this.viewChildFooter.nativeElement.children.length > 0;
    }

    protected isImageOrIconShown():boolean
    {
        return (this.inputImagePath && this.inputImagePath.length > 0) || !isNullOrUndefined(this.inputPlaceholderIcon);
    }
}
