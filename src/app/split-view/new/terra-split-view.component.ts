import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { TerraSplitViewConfig } from './data/terra-split-view.config';
import { TerraSplitViewDetail } from './data/terra-split-view-detail';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector: 'terra-split-view-new',
               template: require('./terra-split-view.component.html'),
               styles:   [require('./terra-split-view.component.scss')]
           })
export class TerraSplitViewComponentNew implements OnDestroy, OnInit, OnChanges
{
    @Input() inputConfig:TerraSplitViewConfig;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;
    
    private modules:Array<TerraSplitViewDetail> = [];
    
    public static ANIMATION_SPEED = 1000; // ms
    
    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }
    
    ngOnDestroy()
    {
        this.inputConfig.reset();
    }
    
    ngOnInit()
    {
        this.inputConfig.addViewEventEmitter.subscribe((value:TerraSplitViewInterface) =>
                                                       {
                                                           this.addViewToList(value);
            
                                                           this.inputConfig.currentSelectedView = value;
                                                           this.changeBreadcrumbName(value);
                                                           this.updateBreadCrumbs();
                                                       });
        
        this.inputConfig.deleteViewEventEmitter.subscribe((value:TerraSplitViewInterface) =>
                                                          {
                                                              this.updateBreadCrumbs();
                                                          });
    }
    
    ngOnChanges(changes:SimpleChanges)
    {
        if(changes["inputConfig"].currentValue !== undefined)
        {
            this.updateBreadCrumbs();
        }
    }
    
    checkModuleVisibility(module:TerraSplitViewDetail, view:TerraSplitViewInterface):boolean
    {
        return module.currentSelectedView != view;
    }
    
    addViewToList(view:TerraSplitViewInterface)
    {
        let viewFound:boolean = false;
        
        for(let detail of this.modules)
        {
            if(detail.identifier == view.mainComponentName)
            {
                viewFound = true;
                break;
            }
        }
        
        if(viewFound)
        {
            for(let detail of this.modules)
            {
               if(detail.identifier == view.mainComponentName)
               {
                   let hasSameParams:boolean = false;
                   
                   for(let detailView of detail.views)
                   {
                       hasSameParams = JSON.stringify(detailView.parameter) == JSON.stringify(view.parameter);
                       
                       if(hasSameParams)
                       {
                           this.updateViewport(view.mainComponentName);
                           break;
                       }
                   }
                   
                   if(!hasSameParams)
                   {
                       detail.views.push(view);
                       break;
                   }
               }
            }
        }
        else
        {
            let views:Array<TerraSplitViewInterface> = [];
            views.push(view);
            
            this.modules.push({
                                  views:      views,
                                  identifier: view.mainComponentName,
                                  defaultWidth: view.defaultWidth,
                                  currentSelectedView: view
                              });
        }
    }
    
    private changeBreadcrumbName(view:TerraSplitViewInterface)
    {
        for(let module of this.modules)
        {
            if(module.identifier == view.mainComponentName)
            {
                module.currentSelectedView = view;
                
            }
            
            if(view.parent != null && module.identifier == view.parent.mainComponentName)
            {
                module.currentSelectedView = view.parent;
            }
            
            this.changeNextViewsBreadcrumbs(module, view.children);
        }
    }
    
    private changeNextViewsBreadcrumbs(module:TerraSplitViewDetail, views:Array<TerraSplitViewInterface>)
    {
        if(views != null)
        {
            for(let view of views)
            {
                if(module.identifier == view.mainComponentName)
                {
                    module.currentSelectedView = view;
                }
                
                if(view.children)
                {
                    this.changeNextViewsBreadcrumbs(module, view.children);
                }
            }
        }
    }
    
    private setSelectedView(view:TerraSplitViewInterface)
    {
        console.log(view);
        this.inputConfig.currentSelectedView = view;
        this.changeBreadcrumbName(view);
    }
    
    private updateBreadCrumbs()
    {
        if(this.inputConfig.views != null)
        {
            let currentModule:TerraSplitViewInterface;
            
            currentModule = this.inputConfig.currentSelectedView;
            
            if(currentModule)
            {
                this.updateViewport(currentModule.mainComponentName);
            }
            
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
    
    public updateViewport(id:string):void
    {
        setTimeout(function()
                   {
                       let anchor = $('#' + id);
                       let breadcrumb = $('.' + id); // TODO: vwiebe, fix scope
                       let breadCrumbContainer = breadcrumb.closest('.terra-breadcrumbs');
                       let viewContainer = anchor.parent();
                       let offset = 3;
                       let prevSplitView = breadcrumb.closest('.view').prev();
            
                       // update breadcrumbs
                       breadCrumbContainer.find('div')
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
    
                       // focus view vertically
                       // TODO: @vwiebe, 1. fix breadcrumb scope, 2. don't refocus, 3. refactoring
                       breadCrumbContainer.children('li').each(function()
                                                     {
                                                         var container = $(this);
    
                                                         container.find('a:not(.caret)').each(function()
                                                                                              {
                                                                                                  $(this).off();
                                                                                                  $(this).click(function()
                                                                                                                {
    
                                                                                                                    let yolo = $('.side-scroller').find($('.' + $(this).attr('class')));
    
                                                                                                                    $(yolo.parent()[0]).animate({
                                                                                                                                                    scrollTop: ($(yolo.parent()[0]).scrollTop() +
                                                                                                                                                                yolo[0].getBoundingClientRect().top -
                                                                                                                                                                yolo.parent()[0].getBoundingClientRect().top)
                                                                                                                                                },
                                                                                                                                                1000);
                                                                                                                    
                                                                                                                    breadCrumbContainer.children('li').each(function()
                                                                                                                                                           {
                                                                                                                                                               var container2 = $(this);
                                                                                                                                                               
                                                                                                                                                               if (container.attr('class') != container2.attr('class'))
                                                                                                                                                               {
                                                                                                                                                                   if (container2.find('.caret').length > 0)
                                                                                                                                                                   {
                                                                                                                                                                       let yolo2 = $('.side-scroller').find($('.' + container2.attr('class')));
    
                                                                                                                                                                       $(yolo2.parent()[0]).animate({
                                                                                                                                                                                                       scrollTop: ($(yolo.parent()[0]).scrollTop() +
                                                                                                                                                                                                                   yolo[0].getBoundingClientRect().top -
                                                                                                                                                                                                                   yolo.parent()[0].getBoundingClientRect().top)
                                                                                                                                                                                                   },
                                                                                                                                                                                                   1000);
                                                                                                                                                                   }
                                                                                                                                                               }
                                                                                                                                                               
                                                                                                                                                           });
                                                                                                                });
                                                                                              });
                                                     });
            
                       // focus view horizontally
                       if(anchor[0] != null &&
                          anchor[0].getBoundingClientRect().left > viewContainer.scrollLeft() - offset &&
                          anchor[0].getBoundingClientRect().right <= viewContainer[0].getBoundingClientRect().right)
                       {
                           //viewContainer.stop();
                           //anchor.animate({scrollTop: (anchor[0].getBoundingClientRect().top + 200)},
                           //               this.ANIMATION_SPEED);
                
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
