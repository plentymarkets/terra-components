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
        this.inputConfig.reset();
    }
    
    ngOnInit()
    {
        this.inputConfig.addViewEventEmitter.subscribe((value:TerraSplitViewIn) =>
                                                       {
                                                           //if(!value.componentChildren)
                                                           //{
                                                           //    this.addViewToList(value);
                                                           //}
                                                           
                                                           this.updateBreadCrumbs();
                                                       });
        
        this.inputConfig.deleteViewEventEmitter.subscribe((value:TerraSplitViewIn) =>
                                                       {
                                                           //this.removeViewFromList(value);
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
    
    //addViewToList(view:TerraSplitViewIn)
    //{
    //    this.modules.push(view);
    //
    //    if(view.nextView)
    //    {
    //        this.addViewToList(view.nextView);
    //    }
    //}
    //
    //removeViewFromList(view:TerraSplitViewIn)
    //{
    //    let index:number = this.modules.indexOf(view);
    //
    //    if(index != -1)
    //    {
    //        this.modules.splice(index, 1)
    //    }
    //
    //    if(view.nextView)
    //    {
    //        this.removeViewFromList(view.nextView);
    //    }
    //}
    //
    //findLastView(view:TerraSplitViewIn):TerraSplitViewIn
    //{
    //    if(view.nextView)
    //    {
    //        return this.findLastView(view.nextView);
    //    }
    //    else
    //    {
    //        return view;
    //    }
    //}
    
    getModuleIndex(module:TerraSplitViewIn):number
    {
        return this.modules.indexOf(module);
    }
    
    private updateBreadCrumbs()
    {
        if(this.inputConfig.views != null)
        {
            //let currentModule = this.findLastView(this.inputConfig.firstView);
            //
            //let index:number = this.getModuleIndex(currentModule);
            //
            //if(index == -1)
            //{
            //    this.addViewToList(this.inputConfig.firstView);
            //}
            //
            //var currentModule:TerraSplitViewIn;
            //if(this.inputConfig.firstView.nextViews)
            //{
            //    currentModule = this.inputConfig.views[this.inputConfig.firstView.nextViews.length - 1];
            //}
            //else
            //{
            //    currentModule = this.inputConfig.firstView;
            //}
            
            var currentModule:TerraSplitViewIn;
            
            currentModule =  this.inputConfig.findLastView2(this.inputConfig.views);
            
            this.updateViewport(currentModule.mainComponentName + "_" + currentModule.instanceKey);
        }
        
        // init same instance sliding
        
        setTimeout(function()
                   {
                       $('terra-split-view-breadcrumb').find('.' + currentModule.mainComponentName + "_" + currentModule.instanceKey).each(function()
                                                                                                       {
                                                                                                           $(this).find('a:not(.caret)').off();
                                                                                                           $(this).find('a:not(.caret)').click(function()
                                                                                                                                                    {
                                                                                                                                                        let yolo = $('.side-scroller').find($('.' + $(this).attr('class')));
    
                                                                                                                                                        $(yolo.parent()[0]).animate({scrollTop: ($(yolo.parent()[0]).scrollTop() + yolo[0].getBoundingClientRect().top - 126)},
                                                                                                                                                                              this.ANIMATION_SPEED);
                                                                                                                                                        
                                                                                                                                                    });
                                                                                                                                   
                                                                                                       });
                   });
        
        
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
                       //
                       //
                       //anchor.animate({scrollTop: (anchor[0].getBoundingClientRect().top + 200)},
                       //                      this.ANIMATION_SPEED);

                   });
    }
}
