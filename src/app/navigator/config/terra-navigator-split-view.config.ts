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
export class TerraNavigatorSplitViewConfig extends TerraSplitConfigBase
{
    public observable:Observable<TerraNavigatorNodeInterface>;
    
    private _subscriber:Subscriber<TerraNavigatorNodeInterface>;
    
    constructor()
    {
        super();
        
        this.observable = new Observable<TerraNavigatorNodeInterface>((subscriber:Subscriber<TerraNavigatorNodeInterface>) =>
                                                                      {
                                                                          this._subscriber = subscriber;
                                                                      });
    }
    
    public openNextLevel(currentLevelItem:TerraNavigatorNodeInterface):void
    {
        this.emitEvent(currentLevelItem);
    }
    
    private emitEvent(event:TerraNavigatorNodeInterface)
    {
        if(this._subscriber)
        {
            // Push up a new event
            this._subscriber.next(event);
        }
    }
}