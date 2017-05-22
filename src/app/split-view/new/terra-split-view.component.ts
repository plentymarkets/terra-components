import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { TerraSplitViewIn } from './data/terra-split-view-in';
import { TerraSplitViewConfig } from './data/terra-split-view.config';

@Component({
               selector: 'terra-split-view-new',
               template: require('./terra-split-view.component.html'),
               styles:   [require('./terra-split-view.component.scss')]
           })
export class TerraSplitViewComponentNew implements OnDestroy, OnInit, OnChanges
{
    //@Input() inputModule:TerraSplitViewIn;
    @Input() inputConfig:TerraSplitViewConfig;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;
    
    private modules:Array<TerraSplitViewIn> = [];
    
    public static ANIMATION_SPEED = 1000; // ms
    
    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }
    
    ngOnDestroy()
    {
        this.inputConfig.eventEmitter.unsubscribe();//TODO test
    }
    
    ngOnInit()
    {
        this.inputConfig.eventEmitter.subscribe((value:TerraSplitViewIn) =>
                                                {
                                                    if(value.componentChildren)
                                                    {
    
                                                    }
                                                    else
                                                    {
                                                        this.addModuleToList(value);
                                                    }
                                                    this.updateBreadCrumbs();
                                                })
    }
    
    ngOnChanges(changes:SimpleChanges)
    {
        if(changes["inputConfig"].currentValue !== undefined)
        {
            this.updateBreadCrumbs();
        }
    }
    
    addModuleToList(view:TerraSplitViewIn)
    {
        this.modules.push(view);
        
        if(view.nextModule)
        {
            this.addModuleToList(view.nextModule);
        }
    }
    
    findLastModule(view:TerraSplitViewIn):TerraSplitViewIn
    {
        if(view.nextModule)
        {
            return this.findLastModule(view.nextModule);
        }
        else
        {
            return view;
        }
    }
    
    getModuleIndex(module:TerraSplitViewIn):number
    {
        return this.modules.indexOf(module);
    }
    
    private updateBreadCrumbs()
    {
        if(this.inputConfig.module != null)
        {
            let currentModule = this.findLastModule(this.inputConfig.module);
            
            let index:number = this.getModuleIndex(currentModule);
            
            if(index == -1)
            {
                this.addModuleToList(this.inputConfig.module);
            }
            
            this.updateViewport(currentModule.mainComponentName + "_" + this.getModuleIndex(currentModule));
        }
        
        // init breadcrumb sliding
        setTimeout(function()
                   {
                       $('.terra-breadcrumbs').each(function()
                                                    {
                                                        $(this).find('li').each(function()
                                                                                {
                                                                                    let viewContainer = $(this)
                                                                                        .closest('.terra-breadcrumbs');
                                                                                    let viewContainerOffsetLeft = viewContainer.offset().left;
                                                                                    let viewContainerWidth = viewContainer.width();
                    
                                                                                    $(this).off()
                                                                                    $(this).mouseenter(function()
                                                                                                       {
                                                                                                           let elementWidth = $(this)
                                                                                                               .width();
                                                                                                           let elementOffsetLeft = $(this)
                                                                                                               .offset().left;
                                                                                                           let viewContainerScrollLeft = viewContainer.scrollLeft();
                                                                                                           let offset = 0;
                        
                                                                                                           if(elementOffsetLeft < viewContainer.offset().left)
                                                                                                           {
                                                                                                               offset = viewContainerScrollLeft + elementOffsetLeft - 10;
                                                                                                           }
                                                                                                           else if(elementOffsetLeft + elementWidth + 30 > viewContainerOffsetLeft + viewContainerWidth)
                                                                                                           {
                                                                                                               offset = viewContainerScrollLeft + elementOffsetLeft + elementWidth + 30 - viewContainerWidth;
                                                                                                           }
                                                                                                           else
                                                                                                           {
                                                                                                               return;
                                                                                                           }
                                                                                                           viewContainer.stop();
                                                                                                           viewContainer.animate({scrollLeft: offset},
                                                                                                                                 1200);
                                                                                                       });
                                                                                });
                                                    });
                   });
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
            
                       // offset fix for navigator
                       if(prevSplitView[0] != null)
                       {
                           offset = offset + prevSplitView.width() + (3 * offset);
                       }
            
                       // offset fix for overlay
                       if($($(anchor[0].closest('.hasSplitView')).find(anchor))[0] != null)
                       {
                           offset = offset + ($(window).width() / 2 - viewContainer.width() / 2);
                       }
            
                       viewContainer.stop();
                       viewContainer.animate({scrollLeft: (anchor[0].getBoundingClientRect().left + viewContainer.scrollLeft() - offset)},
                                             this.ANIMATION_SPEED);
                   });
    }
}
