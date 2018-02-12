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
    template: require('./terra-split-view.component.html'),
    styles:   [require('./terra-split-view.component.scss'),
               require('./terra-split-view.component.glob.scss').toString()
    ]
})
/** @deprecated - please use `TerraMultiSplitViewComponent` instead */
export class TerraSplitViewComponent implements OnChanges, OnDestroy
{
    public static ANIMATION_SPEED:number = 1000; // ms

    @Input()
    public inputModules:Array<TerraSplitViewInterface>;

    @Input()
    public inputShowBreadcrumbs:boolean;

    @Input()
    public inputUpdateViewport:boolean;

    private _breadCrumbsPath:string;

    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
        this.inputUpdateViewport = true;
    }

    public ngOnDestroy():void
    {
        this.inputModules.splice(0, this.inputModules.length);
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this.inputUpdateViewport)
        {
            if(changes['inputModules'].currentValue !== undefined && changes['inputModules'].currentValue.length > 0)
            {
                let currentModule:TerraSplitViewInterface = this.inputModules[this.inputModules.length - 1];
                this.updateViewport(currentModule.mainComponentName + '_' + currentModule.instanceKey);
            }

            // init breadcrumb sliding
            setTimeout(function():void
            {
                $('.terra-breadcrumbs').each(function():void
                {
                    $(this).find('li').each(function():void
                    {
                        var viewContainer:JQuery = $(this).closest('.terra-breadcrumbs');
                        var viewContainerOffsetLeft:number = viewContainer.offset().left;
                        var viewContainerWidth:number = viewContainer.width();

                        $(this).off();
                        $(this).mouseenter(function():void
                        {
                            let elementWidth:number = $(this).width();
                            let elementOffsetLeft:number = $(this).offset().left;
                            let viewContainerScrollLeft:number = viewContainer.scrollLeft();
                            let offset:number = 0;

                            if(elementOffsetLeft < viewContainer.offset().left)
                            {
                                offset = viewContainerScrollLeft + elementOffsetLeft;
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
                            viewContainer.animate({scrollLeft: offset}, 1200);
                        });
                    });
                });
            });
        }
    }

    private updateViewport(id:string):void
    {
        setTimeout(function():void
        {
            let anchor:JQuery = $('#' + id);
            let breadcrumb:JQuery = $('.' + id);
            let breadCrumbContainer:JQuery = breadcrumb.closest('.terra-breadcrumbs');
            let viewContainer:JQuery = anchor.parent();
            let offset:number = 3;
            let prevSplitView:JQuery = breadcrumb.closest('.view').prev();

            // update breadcrumbs
            breadcrumb.closest('.terra-breadcrumbs').find('div').each(function():void
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
