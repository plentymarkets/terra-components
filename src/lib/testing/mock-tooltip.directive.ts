import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[tcTooltip]'
})
export class MockTooltipDirective {
    @Input()
    public tcTooltip: string | TemplateRef<any>;

    @Input()
    public onlyEllipsisTooltip: boolean;

    @Input()
    public placement: string;
}
