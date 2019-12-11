import { Component } from '@angular/core';
import { ContextMenuTrigger } from '../../context-menu/context-menu-trigger';
import { ContextMenuService } from '../../context-menu/context-menu.service';

@Component({
    selector:    'tc-tabs-component-example',
    templateUrl: './tabs.component.example.html',
    styleUrls:   ['./tabs.component.example.scss'],
    providers:   [ContextMenuService]
})
export class TabsComponentExample
{
    protected links:Array<string> = ['First',
                                     'Second',
                                     'Third'];
    protected activeLink:string = this.links[0];
    protected trigger:ContextMenuTrigger = ContextMenuTrigger.hover;
}
