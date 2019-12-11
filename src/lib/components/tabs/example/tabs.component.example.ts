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
    public _links:Array<string> = ['First',
                                   'Second',
                                   'Third'];
    public _activeLink:string = this._links[0];
    public _trigger:ContextMenuTrigger = ContextMenuTrigger.hover;
}
