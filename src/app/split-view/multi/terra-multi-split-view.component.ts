import {
    Component,
    Input,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraMultiSplitViewConfig } from './data/terra-multi-split-view.config';
import { TerraMultiSplitViewDetail } from './data/terra-multi-split-view-detail';
import { TerraMultiSplitViewInterface } from './data/terra-multi-split-view.interface';

@Component({
    selector: 'terra-multi-split-view',
    template: require('./terra-multi-split-view.component.html'),
    styles: [require('./terra-multi-split-view.component.scss')]
})
export class TerraMultiSplitViewComponent implements OnDestroy, OnInit
{
    @Input() inputConfig:TerraMultiSplitViewConfig;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;

    private modules: Array<TerraMultiSplitViewDetail> = [];

    public static ANIMATION_SPEED = 1000; // ms

    constructor(private zone: NgZone) {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }

    ngOnDestroy() {
        this.inputConfig.reset();
    }

    ngOnInit() {
        this.inputConfig.addViewEventEmitter.subscribe(
            (value: TerraMultiSplitViewInterface) =>
            {
                // synchronize modules array with input config
                this.addToModulesIfNotExist(value);

                // set the selected view
                this.setSelectedView(value);
            }
        );

        this.inputConfig.deleteViewEventEmitter.subscribe(
            (value: TerraMultiSplitViewInterface) =>
            {
                // update modules array
                this.removeFromModules(value);

                // select the parent view
                this.setSelectedView(value.parent);
            }
        );
    }

    private addToModulesIfNotExist(view: TerraMultiSplitViewInterface):void
    {
        // check whether view is null or undefined
        if(isNullOrUndefined(view))
        {
            return;
        }

        // get hierarchy level of selected view
        let hierarchyLevel:number = 0;
        let parent:TerraMultiSplitViewInterface = view.parent;
        while(!isNullOrUndefined(parent))
        {
            parent = parent.parent;
            hierarchyLevel++;
        }

        // check if modules array is not initialized
        if (isNullOrUndefined(this.modules[hierarchyLevel]))
        {
            this.modules.push(
                {
                    views:               [],
                    identifier:          view.mainComponentName,
                    defaultWidth:        view.defaultWidth,
                    currentSelectedView: view
                }
            );
        }

        // get the module of the hierarchy
        let module = this.modules[hierarchyLevel];

        // initialize views array if null or undefined
        if (isNullOrUndefined(module.views))
        {
            module.views = [];
        }

        // check if view is already added to module's views array
        if (!module.views.find((elem) => elem === view))
        {
            // add view to the module's views array
            module.views.push(view);
            module.currentSelectedView = view;
        }
    }

    private setSelectedView(view:TerraMultiSplitViewInterface)
    {
        // update the corresponding module's current- and lastSelectedView
        for(let module of this.modules)
        {
            // check whether the view is already opened
            if (module.currentSelectedView === view)
            {
                // skip further execution since the view is already selected
                break;
            }

            // search for the view
            for(let moduleView of module.views)
            {
                // an existing view has been SELECTED
                if(moduleView === view)
                {
                    module.lastSelectedView = module.currentSelectedView;
                    module.currentSelectedView = view;
                    break;
                }
            }
        }

        this.inputConfig.currentSelectedView = view;
        this.updateViewport(view);
        this.updateBreadCrumbs();
    }

    private updateBreadCrumbs() {
        this.zone.runOutsideAngular(() => {
            // init breadcrumb sliding
            setTimeout(function () {
                $('.terra-breadcrumbs').each(function () {
                    $(this).find('li').each(function () {
                        let viewContainer = $(this)
                            .closest('.terra-breadcrumbs');
                        let viewContainerOffsetLeft = viewContainer.offset().left;
                        let viewContainerWidth = viewContainer.width();

                        $(this).off();
                        $(this).mouseenter(function () {
                            let elementWidth = $(this)
                                .width();
                            let elementOffsetLeft = $(this)
                                .offset().left;
                            let viewContainerScrollLeft = viewContainer.scrollLeft();
                            let offset = 0;

                            if (elementOffsetLeft < viewContainer.offset().left) {
                                offset = viewContainerScrollLeft + elementOffsetLeft - 10;
                            }
                            else if (elementOffsetLeft + elementWidth + 30 > viewContainerOffsetLeft + viewContainerWidth) {
                                offset = viewContainerScrollLeft + elementOffsetLeft + elementWidth + 30 - viewContainerWidth;
                            }
                            else {
                                return;
                            }
                            viewContainer.stop();
                            viewContainer.animate({scrollLeft: offset},
                                1200);
                        });
                    });
                });
            });
        });
    }

    public updateViewport(view:TerraMultiSplitViewInterface): void
    {
        this.zone.runOutsideAngular(() => {
            setTimeout(function () {
                let id: string = view.mainComponentName;

                let parent:TerraMultiSplitViewInterface = view.parent;
                let moduleIndex:number = 0;

                while (!isNullOrUndefined(parent))
                {
                    parent = parent.parent;
                    moduleIndex++;
                }

                let anchor = $('#module' + moduleIndex);
                let currentBreadcrumb = $('.' + id); // TODO: vwiebe, fix scope
                let breadCrumbContainer = currentBreadcrumb.closest('.terra-breadcrumbs');
                let viewContainer = anchor.parent();
                let offset = 3;
                let prevSplitView = currentBreadcrumb.closest('.view').prev();
                
                // focus breadcrumbs
                if(currentBreadcrumb[0] != null)
                {
                    breadCrumbContainer.stop();
                    breadCrumbContainer.animate(
                        {scrollLeft: (currentBreadcrumb[0].getBoundingClientRect().left + breadCrumbContainer.scrollLeft())},
                        this.ANIMATION_SPEED);
                }
                
                breadCrumbContainer.children('li').each(function () {
                    var breadcrumb = $(this);

                    let caret = breadCrumbContainer.find('.caret');
                    caret.first().css('display','inline');
                    //caret.css('display','inline');
    
                    breadcrumb.find('a:not(.caret)').each(function () {
                        
                        var breadcrumbEntry = $(this);
    
                        breadcrumbEntry.off();
                        breadcrumbEntry.click(function () {
                            setTimeout(function() {
                                let correspondingView = $('.side-scroller').find($('.' + breadcrumbEntry.attr('class')));
                                let verticalContainer = correspondingView.parent();
        
                                var viewOffset = verticalContainer.scrollTop() +
                                                 correspondingView[0].getBoundingClientRect().top -
                                                 verticalContainer[0].getBoundingClientRect().top;
        
                                // adjust viewport for clicked breadcrumb
                                verticalContainer.animate({
                                    scrollTop: (verticalContainer.scrollTop() +
                                                correspondingView[0].getBoundingClientRect().top -
                                                verticalContainer[0].getBoundingClientRect().top)
                                }, 400);
        
                                breadCrumbContainer.children('li').each(function() {
                                    var breadcrumbContainers = $(this);
            
                                    if(breadcrumb.attr('class') != breadcrumbContainers.attr('class'))
                                    {
                                        if(breadcrumbContainers.find('.caret').length > 0)
                                        {
                                            let firstClassName = breadcrumbContainers.attr('class').split(' ')[0];
                                            let correspondingView = $('#' + firstClassName);
                    
                                            // adjust viewport for all follow-up breadcrumbs
                                            correspondingView.animate({
                                                scrollTop: (viewOffset)
                                            }, 400);
                                        }
                                    }
                                });
                            }, 600);
                        });
                    });
                });
                
                // focus view horizontally
                if (anchor[0] != null &&
                    anchor[0].getBoundingClientRect().left > viewContainer.scrollLeft() - offset &&
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
        });
    }

    private removeFromModules(view:TerraMultiSplitViewInterface):void
    {
        // check whether view is null or undefined
        if(isNullOrUndefined(view))
        {
            // ERROR... stop further execution
            return;
        }

        // get the corresponding module
        let module = this.getModuleOfView(view);

        // check whether module is defined
        if (isNullOrUndefined(module))
        {
            // ERROR... stop further execution
            return;
        }

        // check if module has more than one view
        if (module.views.length <= 1)
        {
            if (!isNullOrUndefined(view.children))
            {
                view.children.forEach(
                    (elem) =>
                    {
                        this.removeFromModules(elem);
                    }
                );
            }

            // remove complete module
            let moduleIndex:number = this.modules.findIndex((mod) => mod === module);
            this.modules.splice(moduleIndex,1);
        }
        else
        {
            // also delete all children from the modules array
            if (!isNullOrUndefined(view.children))
            {
                view.children.forEach(
                    (elem) =>
                    {
                        this.removeFromModules(elem);
                    }
                );
            }

            // get the index of the view in the module's views array
            let viewIndex:number = module.views.findIndex((elem) => elem === view);

            // remove view from module's views array
            module.views.splice(viewIndex,1);

            // reset current selected view
            if (!isNullOrUndefined(module.lastSelectedView))
            {
                module.currentSelectedView = module.lastSelectedView;
            }
            else
            {
                module.currentSelectedView = module.views[0];
            }
        }
    }

    protected getModuleOfView(view):TerraMultiSplitViewDetail
    {
        // get hierarchy level of deleted view
        let hierarchyLevel:number = 0;
        let parent:TerraMultiSplitViewInterface = view.parent;
        while(!isNullOrUndefined(parent))
        {
            parent = parent.parent;
            hierarchyLevel++;
        }

        return this.modules[hierarchyLevel];
    }
}
