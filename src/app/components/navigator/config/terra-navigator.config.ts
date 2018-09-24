import {
    Observable,
    Subscriber
} from 'rxjs';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';

/**
 * @author mscharf
 */
export class TerraNavigatorConfig<D>
{
    public observableNewNodeByRootPath:Observable<TerraNavigatorNodeInterface<D>>;
    public observableNewNodesByRoute:Observable<Array<TerraNavigatorNodeInterface<D>>>;

    private subscriberNewNodeByRootPath:Subscriber<TerraNavigatorNodeInterface<D>>;
    private subscriberNewNodesByRoute:Subscriber<Array<TerraNavigatorNodeInterface<D>>>;

    constructor()
    {
        this.observableNewNodeByRootPath = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>):void =>
            {
                this.subscriberNewNodeByRootPath = subscriber;
            });

        this.observableNewNodesByRoute = new Observable<Array<TerraNavigatorNodeInterface<D>>>(
            (subscriber:Subscriber<Array<TerraNavigatorNodeInterface<D>>>):void =>
            {
                this.subscriberNewNodesByRoute = subscriber;
            });
    }

    public addNodeByRootPath(newNode:TerraNavigatorNodeInterface<D>):void
    {
        if(this.subscriberNewNodeByRootPath)
        {
            this.subscriberNewNodeByRootPath.next(newNode);
        }
    }

    public addNodesByRoute(newNodes:Array<TerraNavigatorNodeInterface<D>>):void
    {
        if(this.subscriberNewNodesByRoute)
        {
            this.subscriberNewNodesByRoute.next(newNodes);
        }
    }
}
