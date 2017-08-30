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
    public observableRefresh:Observable<any>;

    private _subscriberNewNodeByRootPath:Subscriber<TerraNavigatorNodeInterface<D>>;
    private _subscriberNewNodesByRoute:Subscriber<Array<TerraNavigatorNodeInterface<D>>>;
    private _subscriberRefresh:Subscriber<any>;

    constructor()
    {
        this.observableNewNodeByRootPath = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNewNodeByRootPath = subscriber;
            });

        this.observableNewNodesByRoute = new Observable<Array<TerraNavigatorNodeInterface<D>>>(
            (subscriber:Subscriber<Array<TerraNavigatorNodeInterface<D>>>) =>
            {
                this._subscriberNewNodesByRoute = subscriber;
            });

        this.observableRefresh = new Observable<any>(
            (subscriber:Subscriber<any>) =>
            {
                this._subscriberRefresh = subscriber;
            });
    }

    public addNodeByRootPath(newNode:TerraNavigatorNodeInterface<D>)
    {
        if(this._subscriberNewNodeByRootPath)
        {
            this._subscriberNewNodeByRootPath.next(newNode);
        }
    }

    public addNodesByRoute(newNodes:Array<TerraNavigatorNodeInterface<D>>)
    {
        if(this._subscriberNewNodesByRoute)
        {
            this._subscriberNewNodesByRoute.next(newNodes);
        }
    }

    public refresh()
    {
        if(this._subscriberRefresh)
        {
            this._subscriberRefresh.next();
        }
    }
}
