import {
    Component,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
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
export class TerraMultiSplitViewComponent implements OnDestroy, OnInit, OnChanges
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
        // initialize modules array
        this.modules = [];

        this.inputConfig.addViewEventEmitter.subscribe(
            (value: TerraMultiSplitViewInterface) =>
            {
                // synchronize modules array with input config
                this.synchronizeModulesWithInputTree(this.inputConfig.views, 0);

                // set the selected view
                this.setSelectedView(value);
            }
        );

        this.inputConfig.deleteViewEventEmitter.subscribe(
            (value: TerraMultiSplitViewInterface) =>
            {
                // TODO: implement behavior in synchronize function
                this.updateBreadCrumbs();
            }
        );
    }

    ngOnChanges(changes:SimpleChanges)
    {
        if(changes["inputConfig"].currentValue !== undefined)
        {
            // synchronize data model if updated
            this.synchronizeModulesWithInputTree(changes['inputConfig'].currentValue.views,0);
        }
    }

    private synchronizeModulesWithInputTree(children: TerraMultiSplitViewInterface[], hierarchyLevel: number):void
    {
        // check whether children are null or undefined
        if(isNullOrUndefined(children))
        {
            return;
        }

        // go through all the children
        children.forEach(
            (child) =>
            {
                // initialize hierarchy level if not defined
                if (isNullOrUndefined(this.modules[hierarchyLevel]))
                {
                    this.modules[hierarchyLevel] =
                        {
                            views:               [],
                            identifier:          child.mainComponentName,
                            defaultWidth:        child.defaultWidth,
                            currentSelectedView: child
                        };
                }

                // initialize views array if null or undefined
                if (isNullOrUndefined(this.modules[hierarchyLevel].views))
                {
                    this.modules[hierarchyLevel].views = [];
                }

                // before: check if it is already added/existing
                if (this.modules[hierarchyLevel].views.findIndex((view) => view.name === child.name) === -1)
                {
                    // add children of this hierarchy level to the modules array
                    this.modules[hierarchyLevel].views.push(child);
                    this.modules[hierarchyLevel].currentSelectedView = child;
                }

                // go deeper
                if (!isNullOrUndefined(child.children) && child.children.length > 0)
                {
                    this.synchronizeModulesWithInputTree(child.children, hierarchyLevel + 1);
                }
            }
        );
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
                // an existing view has been ADDED -> not the same instance of the view
                else if (moduleView.name === view.name)
                {
                    module.lastSelectedView = module.currentSelectedView;
                    module.currentSelectedView = moduleView;
                    break;
                }
            }
        }

        this.inputConfig.currentSelectedView = view;
        this.updateViewport(view.mainComponentName);
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

    public updateViewport(id: string): void
    {
        this.zone.runOutsideAngular(() => {
            setTimeout(function () {
                let anchor = $('#' + id);
                let breadcrumb = $('.' + id); // TODO: vwiebe, fix scope
                let breadCrumbContainer = breadcrumb.closest('.terra-breadcrumbs');
                let viewContainer = anchor.parent();
                let offset = 3;
                let prevSplitView = breadcrumb.closest('.view').prev();

                // update breadcrumbs
                breadCrumbContainer.find('div')
                    .each(function () {
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
                breadCrumbContainer.children('li').each(function () {
                    var container = $(this);
                    
                    let caret = breadCrumbContainer.find('.caret');
                    caret.first().css('display','inline');
                    
                    container.find('a:not(.caret)').each(function () {
                        $(this).off();
                        $(this).click(function () {

                            let yolo = $('.side-scroller').find($('.' + $(this).attr('class')));

                            $(yolo.parent()[0]).animate({
                                    scrollTop: ($(yolo.parent()[0]).scrollTop() +
                                    yolo[0].getBoundingClientRect().top -
                                    yolo.parent()[0].getBoundingClientRect().top)
                                },
                                1000);

                            breadCrumbContainer.children('li').each(function () {
                                var container2 = $(this);

                                if (container.attr('class') != container2.attr('class')) {
                                    if (container2.find('.caret').length > 0) {
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
                if (anchor[0] != null &&
                    anchor[0].getBoundingClientRect().left > viewContainer.scrollLeft() - offset &&
                    anchor[0].getBoundingClientRect().right <= viewContainer[0].getBoundingClientRect().right) {
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
}
