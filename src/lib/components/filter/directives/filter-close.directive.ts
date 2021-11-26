import { Directive, HostListener } from '@angular/core';

/** Param to handle the closing of the filter on click. **/
export const terraFilterClose: string = '_terraFilterClose';

/** Directive to close the filter menu on search button click. */
@Directive({
    selector: '[terraFilterClose]'
})
export class FilterCloseDirective {
    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        event[terraFilterClose] = true;
    }
}
