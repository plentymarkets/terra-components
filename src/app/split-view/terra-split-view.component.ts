import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss')],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent implements OnChanges
{
    @Input() inputModules:Array<TerraSplitViewInterface>;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;
    
    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }
    
    ngOnChanges(changes:SimpleChanges)
    {
        if (changes["inputModules"].currentValue !== undefined && changes["inputModules"].currentValue.length > 0)
        {
            if (this.inputModules != null)
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
    
                       // update breadcrumbs
                       breadcrumb.closest('.terra-breadcrumbs')
                                 .find('div')
                                 .each(function()
                                       {
                                           $(this).removeClass('active');
                                       });
    
                       breadcrumb.addClass('active');
                       
                       let breadCrumbContainer = breadcrumb.closest('.terra-breadcrumbs');
    
                       breadCrumbContainer.stop();
                       
                       if (breadcrumb[0] != null)
                       {
                           breadCrumbContainer.animate({ scrollLeft: (breadcrumb[0].getBoundingClientRect().left + breadCrumbContainer.scrollLeft()) }, 500);
                       }
                       
                        //alert(anchor.closest('.view').prev().attr('id')); //SplitViewNavigatorDetailShowcaseComponent_SPLIT-VIEW-NAVIGATOR-SHOWCASE
                       
                       let viewContainer = anchor.parent();
                       
                       // focus view
                       if (anchor[0].getBoundingClientRect().left > viewContainer.scrollLeft() - 3 &&
                           anchor[0].getBoundingClientRect().right <= viewContainer[0].getBoundingClientRect().right)
                       {
                           return;
                       }
    
                       viewContainer.stop();
                       viewContainer.animate({ scrollLeft: (anchor[0].getBoundingClientRect().left + viewContainer.scrollLeft() - 3) }, 500);
                   });
    }
}
