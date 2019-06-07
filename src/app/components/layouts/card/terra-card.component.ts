import {
    AfterContentChecked,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { StringHelper } from '../../../helpers/string.helper';

@Component({
    selector: 'terra-card',
    styleUrls: [ './terra-card.component.scss'],
    templateUrl: './terra-card.component.html'
})
export class TerraCardComponent implements AfterContentChecked
{
    @ViewChild('header')
    public viewChildHeader:ElementRef;

    @ViewChild('body')
    public viewChildBody:ElementRef;

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
    private showBody:boolean;
    private showFooter:boolean;

    constructor()
    {
        this.showHeader = false;
        this.showBody = false;
        this.showFooter = false;
    }

    public ngAfterContentChecked():void
    {
        this.showHeader = this.viewChildHeader.nativeElement.children.length > 0;
        this.showBody = this.viewChildBody.nativeElement.children.length > 0;
        this.showFooter = this.viewChildFooter.nativeElement.children.length > 0;
    }

    protected get hasImageOrPlaceholderIcon():boolean
    {
        return !StringHelper.isNullUndefinedOrEmpty(this.inputImagePath) || !isNullOrUndefined(this.inputPlaceholderIcon);
    }
}
