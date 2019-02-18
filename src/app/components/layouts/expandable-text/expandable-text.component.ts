import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'tc-expandable-text',
    styles:   [require('./expandable-text.component.scss')],
    template: require('./expandable-text.component.html')
})
export class ExpandableTextComponent
{
    @Input()
    public collapsed:boolean = true;

    @Input()
    public text:string;

    @Input()
    public visibleLines:number = 1;

    private readMoreText:string = this.translation.translate('expandable.showMore');
    private lessText:string = this.translation.translate('expandable.showLess');

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
}
