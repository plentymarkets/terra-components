import {
    AfterContentChecked,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';

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

    @Input()
    public inputImagePath:string;

    @Input()
    public inputPlaceholderIcon:string;

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
}
