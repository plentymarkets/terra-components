import { Component } from '@angular/core';
import { PlentyDataTableContextMenuService } from './service/plenty-data-table-context-menu.service';
import { PlentyDataTableContextMenuEntry } from './interface/plenty-data-table-context-menu-entry';
import { BaseData } from '../../../data/base-data';

/**
 * @author mkunze
 */
@Component({
             selector:  'context-menu-holder',
             styleUrls: ['plenty-data-table-context-menu.component.css'],
             host:      {
               '(document:click)': 'clickedOutside()',
             },
             templateUrl: 'plenty-data-table-context-menu.component.html'
           })
export class PlentyDataTableContextMenu<D extends BaseData>
{
  contextMenuLinkList:Array<PlentyDataTableContextMenuEntry<D>> = [];
  isShown = false;
  private mouseLocation:{left:number,top:number} = {
    left: 0,
    top:  0
  };

  constructor(private contextMenuService:PlentyDataTableContextMenuService<D>)
  {
    contextMenuService.show.subscribe(
      e => this.showMenu(e.event, e.obj));
  }

  get locationCss()
  {
    return {
      'display':  this.isShown ? 'block' : 'none',
      left:       this.mouseLocation.left + 'px',
      top:        this.mouseLocation.top + 'px',
    };
  }

  clickedOutside()
  {
    this.isShown = false
  }

  showMenu(event,
           contextMenuLinkList:Array<PlentyDataTableContextMenuEntry<D>>)
  {
    this.isShown = true;
    this.contextMenuLinkList = contextMenuLinkList;
    this.mouseLocation = {
      left: event.clientX,
      top:  event.clientY
    }
  }
}
