import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { Language } from 'angular-l10n';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'tc-expandable-text',
    styles:   [require('./expandable-text.component.scss')],
    template: require('./expandable-text.component.html')
})
export class ExpandableTextComponent implements AfterViewInit
{
    /**
     * @description Handle the expanded state.
     */
    @Input()
    public expanded:boolean = false;

    /**
     * @description The visible lines when the text is not expanded.
     */
    @Input()
    public lines:number = 1;

    protected showExpandedButton:boolean = false;

    @Language()
    private lang:string;

    @ViewChild('templateWrapper')
    private expandable:ElementRef;

    protected toggleCollapse():void
    {
        this.expanded = !this.expanded;
    }

    private isEllipsisActive(element:HTMLElement):boolean
    {
        return (element.offsetWidth < element.scrollWidth);
    }

    private checkElementChildToShowButton():void
    {
        let lastSpan:HTMLElement = this.expandable.nativeElement.lastElementChild as HTMLElement;

        this.showExpandedButton = !isNullOrUndefined(lastSpan) && this.isEllipsisActive(lastSpan);
    }

    public ngAfterViewInit():void
    {
        setTimeout(() =>
        {
            this.checkElementChildToShowButton();
        });
    }
}
