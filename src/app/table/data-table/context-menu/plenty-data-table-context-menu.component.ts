import { Component } from '@angular/core';
import { PlentyDataTableContextMenuService } from './service/plenty-data-table-context-menu.service';
import { PlentyDataTableContextMenuEntry } from './interface/plenty-data-table-context-menu-entry';
import { BaseData } from '../../../data/base-data';

/**
 * @author mkunze
 */
@Component({
               selector: 'context-menu-holder',
               // styleUrls: ['plenty-data-table-context-menu.component.css'],
               styles:   [`.context-menu ul {
                              display: block;
                              list-style-type: none;
                              margin: 0;
                              padding: 0;
                              text-align: left;
                              position: absolute;
                              z-index: 99999;
                              width: 11.6rem;
                              border: 1px solid grey;
                            }
                            
                            .context-menu ul li {
                              padding: .25em .5em;
                              border-top: 1px solid #f2f2f2;
                              display: block;
                              text-decoration: none;
                              background: #e0e0e0;
                              text-overflow: ellipsis;
                              white-space: nowrap;
                              overflow: hidden;
                              width: 11.5rem;
                              cursor: pointer;
                            }
                            
                            .context-menu ul li:hover {
                              background: #008ebd;
                              color: white;
                            }
                            
                            .context-menu{
                              position: fixed;
                              z-index: 99999;
                            }
                            
                            .context-menu ul .context-menu-divider {
                              background: grey;
                              cursor: default;
                              height: 1px;
                              overflow: hidden;
                            }`],
               host:     {
                   '(document:click)': 'clickedOutside()',
               },
               template: `<div [ngStyle]="locationCss" class="context-menu">
                              <ul>
                                <template ngFor let-link [ngForOf]="contextMenuLinkList">
                                  <li *ngIf="!link.isDivider" (click)="link.subject.next(link)">
                                    {{link.title}}
                                  </li>
                                  <div *ngIf="link.isDivider" class="context-menu-divider"></div>
                                </template>
                              </ul>
                            </div>`
               // templateUrl: 'plenty-data-table-context-menu.component.html'
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
            'display': this.isShown ? 'block' : 'none',
            left:      this.mouseLocation.left + 'px',
            top:       this.mouseLocation.top + 'px',
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
