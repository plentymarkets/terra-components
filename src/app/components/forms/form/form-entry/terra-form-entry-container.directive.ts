import {
    Directive,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: '[tcFormEntryContainer]'
})
export class TerraFormEntryContainerDirective
{
    constructor(public viewContainerRef:ViewContainerRef)
    {}
}
