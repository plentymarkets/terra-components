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
    public observableUpdateActiveItem:Observable<Array<TerraNavigatorNodeInterface<D>>>;

    private _subscriberNodeClicked:Subscriber<TerraNavigatorNodeInterface<D>>;
    private _subscriberUpdateActiveItem:Subscriber<Array<TerraNavigatorNodeInterface<D>>>;

    constructor()
    {
        super();

        this.observableUpdateActiveItem = new Observable<Array<TerraNavigatorNodeInterface<D>>>(
            (subscriber:Subscriber<Array<TerraNavigatorNodeInterface<D>>>) =>
            {
                this._subscriberUpdateActiveItem = subscriber;
            });

        this.observableNodeClicked = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNodeClicked = subscriber;
            });
    }

    public openNextLevel(currentLevelItem:TerraNavigatorNodeInterface<D>):void
    {
        if(this._subscriberNodeClicked)
        {
            this._subscriberNodeClicked.next(currentLevelItem);
        }
    }

    public updateActiveItem(nodes:Array<TerraNavigatorNodeInterface<D>>):void
    {
        if(this._subscriberUpdateActiveItem)
        {
            this._subscriberUpdateActiveItem.next(nodes);
        }
    }
}
