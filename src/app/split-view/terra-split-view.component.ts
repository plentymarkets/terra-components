import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss')],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent implements OnChanges, OnDestroy
{
    @Input() inputModules:Array<TerraSplitViewInterface>;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;
    
    public static ANIMATION_SPEED = 1000; // ms
    
    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }
    
    ngOnDestroy()
    {
        this.inputModules.splice(0, this.inputModules.length);
    }
    
    ngOnChanges(changes:SimpleChanges)
    {
        if(changes["inputModules"].currentValue !== undefined && changes["inputModules"].currentValue.length > 0)
        {
            if(this.inputModules != null)
            {
                let currentModule = this.inputModules[this.inputModules.length - 1]
                this.updateViewport(currentModule.mainComponentName + "_" + currentModule.instanceKey);
            }
        }
    }
    
    private updateViewport(id:string):void
    {
        setTimeout(function()
                   {
                       let anchor = $('#' + id);
                       let breadcrumb = $('.' + id);
                       let breadCrumbContainer = breadcrumb.closest('.terra-breadcrumbs');
                       let viewContainer = anchor.parent();
                       let offset = 3;
                       let prevSplitView = breadcrumb.closest('.view').prev();
            
                       // update breadcrumbs
                       breadcrumb.closest('.terra-breadcrumbs')
                                 .find('div')
                                 .each(function()
                                       {
                                           $(this).removeClass('active');
                                       });
            
                       breadcrumb.addClass('active');
            
                       // focus breadcrumbs
                       if(breadcrumb[0] != null)
                       {
                           breadCrumbContainer.stop();
                           breadCrumbContainer.animate(
                               {scrollLeft: (breadcrumb[0].getBoundingClientRect().left + breadCrumbContainer.scrollLeft())},
                               this.ANIMATION_SPEED);
                       }
            
                       // focus view
                       if(anchor[0].getBoundingClientRect().left > viewContainer.scrollLeft() - offset &&
                          anchor[0].getBoundingClientRect().right <= viewContainer[0].getBoundingClientRect().right)
                       {
                           return;
                       }
            
                       if(prevSplitView[0] != null)
                       {
                           offset = offset + prevSplitView.width() + (3 * offset);
                       }
            
                       viewContainer.stop();
                       viewContainer.animate({scrollLeft: (anchor[0].getBoundingClientRect().left + viewContainer.scrollLeft() - offset)},
                                             this.ANIMATION_SPEED);
                   });
    }
}
