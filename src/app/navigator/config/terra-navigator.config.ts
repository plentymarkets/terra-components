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
    public observableNodeListChanged:Observable<TerraNavigatorNodeInterface<D>>;
    
    private _subscriberNodeListChanged:Subscriber<TerraNavigatorNodeInterface<D>>;
    
    private _nodes:Array<TerraNavigatorNodeInterface<D>>;
    
    constructor()
    {
        this.observableNodeListChanged = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNodeListChanged = subscriber;
            });
    }
    
    public addNodeAt(newNode:TerraNavigatorNodeInterface<D>)
    {
        if(this._subscriberNodeListChanged)
        {
            this._subscriberNodeListChanged.next(newNode);
        }
    }
}
