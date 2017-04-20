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
    public observableNewNodeByRoute:Observable<TerraNavigatorNodeInterface<D>>;

    private _subscriberNewNodeByRootPath:Subscriber<TerraNavigatorNodeInterface<D>>;
    private _subscriberNewNodeByRoute:Subscriber<TerraNavigatorNodeInterface<D>>;

    constructor()
    {
        this.observableNewNodeByRootPath = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNewNodeByRootPath = subscriber;
            });

        this.observableNewNodeByRoute = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNewNodeByRoute = subscriber;
            });
    }

    public addNodeByRootPath(newNode:TerraNavigatorNodeInterface<D>)
    {
        if(this._subscriberNewNodeByRootPath)
        {
            this._subscriberNewNodeByRootPath.next(newNode);
        }
    }

    public addNodeByRoute(newNode:TerraNavigatorNodeInterface<D>)
    {
        if(this._subscriberNewNodeByRoute)
        {
            this._subscriberNewNodeByRoute.next(newNode);
        }
    }
}
