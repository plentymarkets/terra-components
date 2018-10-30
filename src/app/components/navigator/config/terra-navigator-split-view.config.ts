import { TerraSplitConfigBase } from '../../split-view/data/terra-split-config-base';
import {
    Observable,
    Subscriber
} from 'rxjs';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';
import { Injectable } from '@angular/core';

/**
 * @author mscharf
 * @deprecated since `terra-navigator` is now deprecated
 */
@Injectable()
export class TerraNavigatorSplitViewConfig<D> extends TerraSplitConfigBase
{
    public observableNodeClicked:Observable<TerraNavigatorNodeInterface<D>>;
    public observableUpdateActiveItem:Observable<Array<TerraNavigatorNodeInterface<D>>>;

    private subscriberNodeClicked:Subscriber<TerraNavigatorNodeInterface<D>>;
    private subscriberUpdateActiveItem:Subscriber<Array<TerraNavigatorNodeInterface<D>>>;

    constructor()
    {
        super();

        this.observableUpdateActiveItem = new Observable<Array<TerraNavigatorNodeInterface<D>>>(
            (subscriber:Subscriber<Array<TerraNavigatorNodeInterface<D>>>):void =>
            {
                this.subscriberUpdateActiveItem = subscriber;
            });

        this.observableNodeClicked = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>):void =>
            {
                this.subscriberNodeClicked = subscriber;
            });
    }

    public openNextLevel(currentLevelItem:TerraNavigatorNodeInterface<D>):void
    {
        if(this.subscriberNodeClicked)
        {
            this.subscriberNodeClicked.next(currentLevelItem);
        }
    }

    public updateActiveItem(nodes:Array<TerraNavigatorNodeInterface<D>>):void
    {
        if(this.subscriberUpdateActiveItem)
        {
            this.subscriberUpdateActiveItem.next(nodes);
        }
    }
}
