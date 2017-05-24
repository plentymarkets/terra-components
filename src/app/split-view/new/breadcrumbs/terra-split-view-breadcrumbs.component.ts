import {
    Component,
    forwardRef,
    Inject,
    Input
} from '@angular/core';
import { TerraSplitViewIn } from '../data/terra-split-view-in';
import { TerraSplitViewComponentNew } from '../terra-split-view.component';

@Component({
               selector: 'terra-split-view-breadcrumb',
               template: require('./terra-split-view-breadcrumbs.component.html'),
               styles:   [require('./terra-split-view-breadcrumbs.component.scss')]
           })
export class TerraSplitViewBreadcrumbsComponent
{
    
    @Input() inputView:TerraSplitViewIn;
    @Input() inputIndex:number;
    @Input() inputLast:boolean;
    @Input() inputFirst:boolean;
    
    constructor(@Inject(forwardRef(() => TerraSplitViewComponentNew)) private splitViewComponent:TerraSplitViewComponentNew)
    {
    }
    
    updateViewport(id:string)
    {
        this.splitViewComponent.updateViewport(id);
    }
}