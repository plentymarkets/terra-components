import {
    Component,
    forwardRef,
    Inject,
    Input,
    OnInit
} from '@angular/core';
import { TerraSplitViewIn } from '../data/terra-split-view-in';
import { TerraSplitViewComponentNew } from '../terra-split-view.component';
import { TerraSplitViewConfig } from '../data/terra-split-view.config';

@Component({
               selector: 'terra-split-view-breadcrumb',
               template: require('./terra-split-view-breadcrumbs.component.html'),
               styles:   [require('./terra-split-view-breadcrumbs.component.scss')]
           })
export class TerraSplitViewBreadcrumbsComponent implements OnInit
{
    
    @Input() inputView:TerraSplitViewIn;
    @Input() inputIndex:number;
    @Input() inputLast:boolean;
    @Input() inputFirst:boolean;
    @Input() inputSplitViewConfig:TerraSplitViewConfig;
    
    constructor(@Inject(forwardRef(() => TerraSplitViewComponentNew)) private splitViewComponent:TerraSplitViewComponentNew)
    {
    
    }
    
    ngOnInit()
    {
        console.log(this.inputView);
    }
    
    updateViewport(id:string)
    {
        console.log(this.inputView);
        this.inputSplitViewConfig.currentSelectedView = this.inputView;
        this.splitViewComponent.updateViewport(id);
    }
}