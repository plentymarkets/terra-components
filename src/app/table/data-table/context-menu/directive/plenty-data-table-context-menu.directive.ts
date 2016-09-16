import {
  Directive,
  Input
} from '@angular/core';
import { PlentyDataTableContextMenuService } from '../service/plenty-data-table-context-menu.service';
import { PlentyDataTableContextMenuEntry } from '../interface/plenty-data-table-context-menu-entry';
import { BaseData } from '../../../../data/base-data';

/**
 * @author mkunze
 */
@Directive({
             selector: '[context-menu]',
             host:     {'(contextmenu)': 'rightClicked($event)'}
           })
export class PlentyDataTableContextMenuDirective<D extends BaseData>
{
  @Input('context-menu') links:Array<PlentyDataTableContextMenuEntry<D>>;

  constructor(private contextMenuService:PlentyDataTableContextMenuService<D>)
  {
  }

  rightClicked(event:MouseEvent)
  {
    this.contextMenuService.show.next({
                                        event: event,
                                        obj:   this.links
                                      });
    event.preventDefault();
  }
}
