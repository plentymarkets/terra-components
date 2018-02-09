import {
    AfterContentChecked,
    Component,
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
    @ViewChild('header') viewChildHeader;
    @ViewChild('footer') viewChildFooter;
    @Input() inputImagePath:string;
    @Input() inputPlaceholderIcon:string;
    private showHeader:boolean;
    private showFooter:boolean;

    constructor()
    {
        this.showHeader = false;
        this.showFooter = false;
    }

    ngAfterContentChecked()
    {
        this.showHeader = this.viewChildHeader.nativeElement.children.length > 0;
        this.showFooter = this.viewChildFooter.nativeElement.children.length > 0;
    }
}
