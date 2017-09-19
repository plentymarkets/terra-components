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
    styles:   [require('./terra-split-view.component.scss')]
})
export class TerraSplitViewComponent implements OnChanges, OnDestroy
{
    @Input() inputModules:Array<TerraSplitViewInterface>;
    @Input() inputShowBreadcrumbs:boolean;
    @Input() inputUpdateViewport:boolean;
    private _breadCrumbsPath:string;

    public static ANIMATION_SPEED = 1000; // ms

    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
        this.inputUpdateViewport = true;
    }

    ngOnDestroy()
    {
        this.inputModules.splice(0, this.inputModules.length);
    }

    ngOnChanges(changes:SimpleChanges)
    {
        if(this.inputUpdateViewport)
        {
            if(changes["inputModules"].currentValue !== undefined && changes["inputModules"].currentValue.length > 0)
            {
                let currentModule = this.inputModules[this.inputModules.length - 1];
                this.updateViewport(currentModule.mainComponentName + "_" + currentModule.instanceKey);
            }

            // init breadcrumb sliding
            setTimeout(function()
            {
                $('.terra-breadcrumbs').each(function()
                {
                    $(this).find('li').each(function()
                    {
                        var viewContainer = $(this).closest('.terra-breadcrumbs');
                        var viewContainerOffsetLeft = viewContainer.offset().left;
                        var viewContainerWidth = viewContainer.width();

                        $(this).off();
                        $(this).mouseenter(function()
                        {
                            var elementWidth = $(this).width();
                            var elementOffsetLeft = $(this).offset().left;
                            var viewContainerScrollLeft = viewContainer.scrollLeft();
                            var offset = 0;

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
                            viewContainer.animate({scrollLeft: offset}, 1200);
                        });
                    });
                });
            });
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
            breadcrumb.closest('.terra-breadcrumbs').find('div').each(function()
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
