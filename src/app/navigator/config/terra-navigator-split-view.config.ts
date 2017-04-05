import { TerraSplitConfigBase } from '../../split-view/data/terra-split-config-base';
import { Injectable } from '@angular/core';
import {
    Observable,
    Subscriber
} from 'rxjs';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';

/**
 * @author mscharf
 */
@Injectable()
export class TerraNavigatorSplitViewConfig<D> extends TerraSplitConfigBase
{
    public observable:Observable<TerraNavigatorNodeInterface<D>>;
    
    private _subscriber:Subscriber<TerraNavigatorNodeInterface<D>>;
    
    constructor()
    {
        super();
        
        this.observable = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriber = subscriber;
            });
    }
    
    public openNextLevel(currentLevelItem:TerraNavigatorNodeInterface<D>):void
    {
        this.emitEvent(currentLevelItem);
    }
    
    private emitEvent(event:TerraNavigatorNodeInterface<D>):void
    {
        if(this._subscriber)
        {
            // Push up a new event
            this._subscriber.next(event);
        }
    }
}
