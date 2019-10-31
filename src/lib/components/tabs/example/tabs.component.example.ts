import { Component } from '@angular/core';

@Component({
    selector: 'tc-tabs-component-example',
    styles:   [require('./tabs.component.example.scss')],
    template: require('./tabs.component.example.html')
})
export class TabsComponentExample
{
    protected links:Array<string> = ['First', 'Second', 'Third'];
    protected activeLink:string = this.links[0];
}
