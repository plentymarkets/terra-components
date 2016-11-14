import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TerraOverlayComponent } from './overlay/terra-overlay.component';
import { TerraSplitViewInterface } from './split-view/data/terra-split-view.interface';
import { DemoViewComponent } from './demo-view/demo-view.component';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss').toString()],
           })
export class TerraComponentsComponent implements OnInit
{
    @ViewChild('viewChildOverlayStatic') viewChildOverlayStatic:TerraOverlayComponent;
    
    private _viewContainerRef:ViewContainerRef;
    private _components:Array<TerraSplitViewInterface> = new Array;
    
    public constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }
    
    ngOnInit()
    {
        this.components.push({
                                 component:    DemoViewComponent,
                                 defaultWidth: '33%',
                                 hidden:       false,
                                 id:           this._components.length
                             });
        this.components.push({
                                 component:    DemoViewComponent,
                                 defaultWidth: '33%',
                                 hidden:       false,
                                 id:           this._components.length
                             });
        //this.components.push({
        //                         component:    DemoViewComponent,
        //                         defaultWidth: '33%',
        //                         hidden:       false,
        //                         id:           this._components.length
        //                     });
    }
    
    
    private openOverlayStatic():void
    {
        this.viewChildOverlayStatic.showOverlay();
    }
    
    public get components():Array<TerraSplitViewInterface>
    {
        return this._components;
    }
    
    public set components(value:Array<TerraSplitViewInterface>)
    {
        this._components = value;
    }
    
    private addComponent():void     //TODO add parameter for components
    {
        this.components.push({
                                 component:    DemoViewComponent,
                                 defaultWidth: '33%',
                                 hidden:       false,
                                 id:           this._components.length
                             });
    }
}
