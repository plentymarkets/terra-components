import { TerraSplitConfigBase } from '../../split-view/data/terra-split-config-base';
import {
    Observable,
    Subscriber
} from 'rxjs';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';
import { Injectable } from '@angular/core';

/**
 * @author mscharf
 */
@Injectable()
export class TerraNavigatorSplitViewConfig<D> extends TerraSplitConfigBase
{
    public observableNodeClicked:Observable<TerraNavigatorNodeInterface<D>>;
    public observableNodeListChanged:Observable<TerraNavigatorNodeInterface<D>>;
    
    private _subscriberNodeClicked:Subscriber<TerraNavigatorNodeInterface<D>>;
    private _subscriberNodeListChanged:Subscriber<TerraNavigatorNodeInterface<D>>;
    
    private _nodes:Array<TerraNavigatorNodeInterface<D>>;
    
    constructor()
    {
        super();
        
        this.observableNodeClicked = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNodeClicked = subscriber;
            });
        
        this.observableNodeListChanged = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNodeListChanged = subscriber;
            });
    }
    
    public openNextLevel(currentLevelItem:TerraNavigatorNodeInterface<D>):void
    {
        if(this._subscriberNodeClicked)
        {
            this._subscriberNodeClicked.next(currentLevelItem);
        }
    }
    
    public addNodeAt(newNode:TerraNavigatorNodeInterface<D>)
    {
        if(this._subscriberNodeListChanged)
        {
            this._subscriberNodeListChanged.next(newNode);
        }
    }
}
