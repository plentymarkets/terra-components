import { Component } from '@angular/core';

@Component({
    selector: 'tc-tooltip-directive-example',
    styles:   [require('./tooltip-directive.example.scss')],
    template: require('./tooltip-directive.example.html')
})
export class TooltipDirectiveExample
{
    protected tooltip:string = 'Tooltip from variable';
}
