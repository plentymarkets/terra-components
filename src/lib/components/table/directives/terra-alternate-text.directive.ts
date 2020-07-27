import {
    Directive,
    Input
} from '@angular/core';

@Directive({
    selector: '[terraAltText]'
})
export class TerraAlternateTextDirective
{
    @Input()
    public altText:string;
}
