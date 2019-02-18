import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'tc-expandable-text',
    styles:   [require('./expandable-text.component.scss')],
    template: require('./expandable-text.component.html')
})
export class ExpandableTextComponent implements OnInit
{
    @Input()
    public collapsed:boolean = false;

    @Input()
    public text:string;

    @Input()
    public visibleLines:number = 1;

    protected readMoreText:string = this.translation.translate('expandable.showMore');
    protected lessText:string = this.translation.translate('expandable.showLess');
    protected maxHeight:string;

    @Output()
    public collapsedChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private translation:TranslationService)
    {
    }

    protected toggleCollapse():void
    {
        this.collapsed = !this.collapsed;
    }

    protected get collapseText():string
    {
        if(this.collapsed)
        {
            return this.readMoreText;
        }

        return this.lessText;
    }

    public ngOnInit():void
    {
        // max-height = line-height (1.2) * visible lines
        this.maxHeight = (1.2 * this.visibleLines) + 'rem';
    }
}
