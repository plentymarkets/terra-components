import { Component } from '@angular/core';

@Component({
    selector:    'tc-tooltip-directive-example',
    templateUrl: './tooltip-directive.example.html'
})
export class TooltipDirectiveExample
{
    public _tooltip:string = 'Tooltip from variable';

    public _tooltipText1:string = 'Tooltip 1';
    public _tooltipText2:string = 'Tooltip 2 changed on click';
}
