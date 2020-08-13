import {
    Directive,
    ViewContainerRef
} from '@angular/core';

/**
 * @description This directive is used to access the viewContainerRef of its host element before the initialization of the host
 * element's view is done. Thus, a component may be created and added dynamically to a host element during the initialization of the host
 *     component.
 */
@Directive({
    selector: '[tcFormEntryContainer]'
})
export class FormEntryContainerDirective
{
    constructor(public viewContainerRef:ViewContainerRef)
    {}
}
