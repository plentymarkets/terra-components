import {
    Component,
    Input,
    ViewChild,
    AfterContentChecked
} from '@angular/core';

@Component({
               selector: 'terra-card',
               styles:   [require('./terra-card.component.scss')],
               template: require('./terra-card.component.html')
           })
export class TerraCardComponent implements AfterContentChecked
{
    @Input() inputImagePath:string;
    @Input() inputPlaceholderIcon:string;
    
    @ViewChild('header') viewChildHeader;
    private showHeader:boolean = false;
    @ViewChild('footer') viewChildFooter;
    private showFooter:boolean = false;
    
    constructor()
    {
    }
    
    ngAfterContentChecked()
    {
        this.showHeader = this.viewChildHeader.nativeElement.children.length > 0;
        this.showFooter = this.viewChildFooter.nativeElement.children.length > 0;
    }
}
