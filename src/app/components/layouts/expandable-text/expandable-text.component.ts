import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {
    Language,
    TranslationService
} from 'angular-l10n';
import { isNullOrUndefined } from 'util';


let nextId:number = 0;

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
     * @description The displayed text.
     */
    @Input()
    public text:string;

    /**
     * @description The visible lines when the text is not expanded.
     */
    @Input()
    public lines:number = 1;

    protected id:string;
    protected showExpandedButton:boolean = true;

    @Language()
    private lang:string;

    constructor()
    {
        // generate the id of the input instance
        this.id = `tc-expandable-text_#${nextId++}`;
    }

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
        let expandable:HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        let lastSpan:HTMLElement = expandable.lastElementChild as HTMLElement;

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
