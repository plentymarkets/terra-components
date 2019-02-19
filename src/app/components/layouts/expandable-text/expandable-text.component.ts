import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';


let nextId:number = 0;

@Component({
    selector: 'tc-expandable-text',
    styles:   [require('./expandable-text.component.scss')],
    template: require('./expandable-text.component.html')
})
export class ExpandableTextComponent implements AfterViewInit
{
    @Input()
    public collapsed:boolean = true;

    @Input()
    public text:string;

    @Input()
    public visibleLines:number = 1;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    protected id:string;
    protected showCollapseButton:boolean = true;

    private readMoreText:string = this.translation.translate('expandable.showMore');
    private lessText:string = this.translation.translate('expandable.showLess');

    @Output()
    public collapsedChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private translation:TranslationService)
    {
        // generate the id of the input instance
        this.id = `tc-expandable-text_#${nextId++}`;
    }

    protected toggleCollapse():void
    {
        this.collapsed = !this.collapsed;
    }

    private isEllipsisActive(element:HTMLElement):boolean
    {
        return (element.offsetWidth < element.scrollWidth);
    }

    protected get collapseText():string
    {
        if(this.collapsed)
        {
            return this.readMoreText;
        }

        return this.lessText;
    }

    private checkElementChildToShowButton():void
    {
        let expandable:HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;

        let lastSpan:HTMLElement = expandable.lastElementChild as HTMLElement;

        this.showCollapseButton = !isNullOrUndefined(lastSpan) && this.isEllipsisActive(lastSpan);
    }

    public ngAfterViewInit():void
    {
        setTimeout(() =>
        {
            this.checkElementChildToShowButton();
        });
    }
}
